from pathlib import Path
from decouple import config
import os


# BASE_DIR es la ruta raíz del proyecto
BASE_DIR = Path(__file__).resolve().parent.parent

# Seguridad
SECRET_KEY = config('SECRET_KEY', default='o47$ui83(c!yd04l1x537=prf6!86iz*b1_kay7fx8@ync+w_e')
OPENAI_API_KEY = config('OPENAI_API_KEY', default='c0ad7775bda9b27ded8c03f9f2ccd738e117e01660a5e69579fe6a64c93eded9')

# Para desarrollo pon DEBUG = True
DEBUG = True

# Cuando DEBUG está en True, ALLOWED_HOSTS puede estar vacío
ALLOWED_HOSTS = []

# Apps instaladas (agrega tu app aquí)
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'mi_app',   # 👈 Tu app personalizada
]

# Middlewares recomendados
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# URLs principal
ROOT_URLCONF = 'mi_proyecto.urls'

# Config de plantillas (para HTML)
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],  # opcional
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# WSGI para producción
WSGI_APPLICATION = 'mi_proyecto.wsgi.application'

# Base de datos (SQLite por defecto)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Validación de contraseñas (opcional)
AUTH_PASSWORD_VALIDATORS = []

# Config de idioma y zona horaria
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Archivos estáticos (CSS, JS)
STATIC_URL = '/static/'
STATICFILES_DIRS = [
    BASE_DIR / "mi_app" / "static",
]
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
# Valor por defecto para campos de clave primaria
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
