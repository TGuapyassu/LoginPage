from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ("email", "name", "is_active")
    search_fields = ("email", "name")
    list_per_page = 20
    search_fields = ('name', 'email')
    ordering = ("name",)
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Informações Pessoais", {"fields": 
            (
            "name",
            )}),
        ("Permissões", {"fields": ("is_staff", "is_active", "is_superuser",  "user_permissions")}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "name", "password1", "password2", "is_staff", "is_active")}
        ),
    )

admin.site.register(CustomUser, CustomUserAdmin)
