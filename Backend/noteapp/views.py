from django.shortcuts import render
from noteapp.models import Note
from noteapp.serializer import NoteSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
# Create your views here.

# from rest_framework.decorators import api_view
@api_view(["GET", "POST"])
# Define a view for handling notes
def notes(request):
    # This view handles both GET and POST requests for notes
    if request.method =="GET":
        # Handle GET request to retrieve all notes
        notes = Note.objects.all()
        # Retrieve all notes from the database
        serializer = NoteSerializer(notes, many=True)
        # Serialize the notes data
        return Response(serializer.data)
    # Handle POST request to create a new note
    elif request.method == 'POST':
        # Create a new note
        serializer = NoteSerializer(data=request.data)
        # Validate the incoming data
        if serializer.is_valid():
            # If the data is valid, save the new note to the database
            serializer.save()
            # Return a success response with the serialized data
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# Define a view for handling individual notes
@api_view(['GET', 'PUT', 'DELETE'])
# Handle individual note operations
def note_detail(request, slug): 
    # This view handles GET, PUT, and DELETE requests for a specific note
    try:
        # Retrieve the note by its slug
        note = Note.objects.get(slug=slug)
        # Check if the note exists
    except Note.DoesNotExist:
        # If the note does not exist, return a 404 error
        return Response(status=status.HTPP_404_404_NOT_FOUND)
    

    if request.method =='GET':
    # Handle GET request to retrieve a specific note
        serializer = NoteSerializer(note)
    # Serialize the note data
        return Response(serializer.data)
    # 
    elif request.method == 'PUT':
        
        serializer = NoteSerializer(note, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, tatus=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
    
    elif request.method == 'DELETE':
        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)