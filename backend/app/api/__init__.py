from fastapi import APIRouter
from .auth import router as auth_router
# from .tasks import router as tasks_router
from .jobs import router as jobs_router 
# from .job import router as answer_router 

router = APIRouter()
router.include_router(auth_router, prefix="/auth", tags=["auth"])
# router.include_router(tasks_router, prefix="/tasks", tags=["tasks"])
router.include_router(jobs_router, prefix="/jobs", tags=["jobs"]) 
# router.include_router(answer_router, prefix="/answer", tags=["answer"]) 
