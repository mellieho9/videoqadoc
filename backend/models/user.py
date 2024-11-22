from uuid import UUID

class User:
    
    name: str
    id: UUID
    email: str
    is_superuser: bool
    
    def __init__(self, name: str, user_id: str, email: str, is_superuser: bool = False):
        self.name = name
        self.id = UUID(user_id)
        self.email = email
        self.is_superuser = is_superuser

    def __repr__(self):
        return str(self.to_json())
    
    def to_json(self):
        return {
            "name": self.name,
            "id": self.id.__str__(),
            "email": self.email,
            "is_superuser": self.is_superuser
        }