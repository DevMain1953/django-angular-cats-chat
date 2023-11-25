import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from cats.models import Message

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        sender = self.scope['user'].username if self.scope['user'].is_authenticated else 'Anonymous'

        await self.save_message_to_database(sender, message)

        await self.send_group_message({
            'type': 'chat.message',
            'message': message,
            'sender': sender,
        })

    async def send_group_message(self, event):
        await self.send(text_data=json.dumps(event))

    @database_sync_to_async
    def save_message_to_database(self, sender, message):
        Message.objects.create(sender=sender, message=message)