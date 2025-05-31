# filepath: c:\Users\joelk\OneDrive\Desktop\Personal Projects 2025\YT-NOTE-APP\Backend\noteapp\urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('notes/', views.notes, name='notes'),  # Endpoint for listing and creating notes
    path('notes/<slug:slug>/', views.note_detail, name='note_detail'),  # Endpoint for individual note operations
]