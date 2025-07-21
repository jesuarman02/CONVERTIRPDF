from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.inicio, name='inicio'),
    path('index/', views.index, name='index'),
    path('convertir/', views.vista_convertir, name='convertir'),
    path('procesar_pdf/', views.procesar_pdf, name='procesar_pdf'),
    path('convertir_pdf_simple/', views.convertir_pdf_simple, name='convertir_pdf_simple'),
    path('descargar/<str:nombre_archivo>/', views.descargar_archivo, name='descargar_archivo'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

