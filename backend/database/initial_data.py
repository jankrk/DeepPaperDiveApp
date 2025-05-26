from database.models.user  import User
from app.core.security import hash_password

def create_default_users(db):
    users = [
        {"email": "admin@example.com", "name": "Admin", "password": "adminpass"},
        {"email": "test@example.com", "name": "Test", "password": "testpass"},
    ]

    for user_data in users:
        user = db.query(User).filter(User.email == user_data["email"]).first()
        if not user:
            new_user = User(
                email=user_data["email"],
                name=user_data["name"],
                hashed_password=hash_password(user_data["password"]),
            )
            db.add(new_user)
    db.commit()
