from django.db import models
from django.utils.text import slugify
from django.utils.crypto import get_random_string
# Create your models here.
class Note(models.Model):

    CATEGORY = (
        ('BUSINESS', 'Business'),
        ('PERSONAL', 'Personal'),
        ('IMPORTANT', 'Important'),
    )
    title = models.CharField(max_length=100) # Title of the note
    body = models.TextField() # Body of the note
    slug = models.SlugField(unique=True, blank=True, null=True) # Unique slug for the note
    category = models.CharField(max_length=15, choices=CATEGORY, default="PERSONAL") # Category of the note
    created = models.DateTimeField(auto_now_add=True) # Date and time when the note was created
    updated = models.DateTimeField(auto_now=True) # Date and time when the note was last updated


    def __str__(self):
        return self.title
    ## The following fields are used to track the user who created the note
    def save(self, *args, **kwargs):
        # Generate a unique slug if it doesn't exist
        if not self.slug:
            # Generate a slug from the title
            slug_base = slugify(self.title)
            # Check if the slug already exists
            slug = slug_base
            # Ensure uniqueness
            while Note.objects.filter(slug=slug).exists():
                # If it exists, append a random string to make it unique
                slug = f"{slug_base}-{get_random_string(5)}"
                # or you can use a random string generator
            self.slug = slug
            # Save the note with the generated slug
        super(Note, self).save(*args, **kwargs)