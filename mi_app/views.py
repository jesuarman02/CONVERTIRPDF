import os
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse, FileResponse
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt

from .procesamiento import (
    ocr_pdf_escaneado,
    extraer_informacion_especifica,
    exportar_a_word,
    convertir_pdf_escaneado_a_word,
    convertir_pdf_digital_a_word,
    convertir_pdf_imagenes_a_word
)

def inicio(request):
    return render(request, "inicio.html")

def index(request):
    return render(request, "index.html")

def vista_convertir(request):
    return render(request, "convertir.html")

def generar_nombre_oficio():
    media_path = settings.MEDIA_ROOT
    existentes = [
        f for f in os.listdir(media_path)
        if f.startswith("Oficio") and f.endswith(".docx")
    ]
    numero = len(existentes) + 1
    return f"Oficio{numero}.docx"


@csrf_exempt
def procesar_pdf(request):
    if request.method == "POST":
        pdf_file = request.FILES.get("pdf")
        nombre = request.POST.get("nombre", "").strip()
        cargo = request.POST.get("cargo", "").strip()
        cuerpo_respuesta = request.POST.get("cuerpo_respuesta", "").strip()
        ccp_adicional = request.POST.get("ccp_adicional", "").strip()

        if not pdf_file or not nombre or not cargo:
            return JsonResponse({"error": "Faltan datos"}, status=400)

        pdf_path = os.path.join(settings.MEDIA_ROOT, "uploaded.pdf")
        txt_path = os.path.join(settings.MEDIA_ROOT, "pdf_limpio.txt")
        txt_extraido_path = os.path.join(settings.MEDIA_ROOT, "pdf_extraido.txt")

        with open(pdf_path, "wb+") as dest:
            for chunk in pdf_file.chunks():
                dest.write(chunk)

        ocr_pdf_escaneado(pdf_path, txt_path)
        extraer_informacion_especifica(txt_path, txt_extraido_path)

        nombre_archivo = generar_nombre_oficio()
        word_path = os.path.join(settings.MEDIA_ROOT, nombre_archivo)

        exportar_a_word(
            txt_extraido_path,
            word_path,
            nombre,
            cargo,
            cuerpo_respuesta,
            ccp_adicional
        )
        return JsonResponse({"archivo": nombre_archivo})

    return JsonResponse({"error": "Método no permitido"}, status=405)

@csrf_exempt
def convertir_pdf_simple(request):
    if request.method != "POST":
        return JsonResponse({"error": "Método no permitido"}, status=405)

    pdf_file = request.FILES.get("pdf")
    tipo_pdf = request.POST.get("tipo_pdf", "")

    if not pdf_file or not tipo_pdf:
        return JsonResponse({"error": "Faltan parámetros"}, status=400)

    nombre = generar_nombre_oficio().replace(".docx", "_Simple.docx")
    word_path = os.path.join(settings.MEDIA_ROOT, nombre)
    pdf_path  = os.path.join(settings.MEDIA_ROOT, "uploaded_simple.pdf")

    with open(pdf_path, "wb+") as f:
        for chunk in pdf_file.chunks():
            f.write(chunk)

    try:
        if tipo_pdf == "digital":
            convertir_pdf_digital_a_word(pdf_path, word_path)
        elif tipo_pdf == "imagenes":
            convertir_pdf_imagenes_a_word(pdf_path, word_path)
        elif tipo_pdf == "escaneado":
            convertir_pdf_escaneado_a_word(pdf_path, word_path)
        else:
            raise ValueError("Tipo de PDF no reconocido")
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"archivo": nombre})

def descargar_archivo(request, nombre_archivo):
    ruta = os.path.join(settings.MEDIA_ROOT, nombre_archivo)
    if os.path.exists(ruta):
        return FileResponse(open(ruta, "rb"),
                            as_attachment=True,
                            filename=nombre_archivo)
    return HttpResponse("Archivo no encontrado", status=404)


def descargar_archivo(request, nombre_archivo):
    ruta_archivo = os.path.join(settings.MEDIA_ROOT, nombre_archivo)
    if os.path.exists(ruta_archivo):
        archivo = open(ruta_archivo, "rb")
        return FileResponse(
            archivo,
            as_attachment=True,
            filename=nombre_archivo
        )
    return HttpResponse("Archivo no encontrado", status=404)