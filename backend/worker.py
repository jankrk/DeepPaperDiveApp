from celery import Celery

celery = Celery(
    "worker",
    broker="redis://redis:6379/0",
    backend="redis://redis:6379/0"
)

@celery.task
def analyze_pdf(task_id, question, file_data):
    # Długi proces — symulacja
    import time
    time.sleep(10)
    return f"Result for {question} on file {file_data[:10]}"
