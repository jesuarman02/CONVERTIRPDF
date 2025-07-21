
# 📄 Convertidor de Archivos PDF a Word con OCR, IA y Django

Este proyecto ha sido desarrollado especialmente para el área de Transparencia de **INFOTEC**, permitiendo convertir documentos PDF en archivos Word `.docx` completamente editables. El sistema reconoce automáticamente si el PDF corresponde a un **oficio de transparencia INFOTEC**, aplicando un formato específico para su exportación. También admite la conversión de otros PDFs escaneados, digitales o con imágenes a Word, integrando tecnologías como **OCR (Tesseract)**, **corrección con IA remota vía Together.ai**, y una interfaz web moderna con **Django** y **SweetAlert**.

---

## ✅ Funcionalidades principales

- Conversión de oficios INFOTEC a formato Word con estructura estándar.
- Procesamiento de PDFs escaneados, digitales y con imágenes.
- Extracción de texto con OCR (Tesseract).
- Limpieza semántica del texto usando IA (LLaMA a través de Together.ai).
- Exportación a Word: formato de transparencia o documento editable genérico.
- Interfaz web amigable con animaciones y alertas.
- Clasificación automática del tipo de documento cargado.

---

## 🧩 Tecnologías utilizadas (actualizadas)

| Categoría       | Tecnología / Biblioteca                         | Uso principal |
|----------------|--------------------------------------------------|---------------|
| 🐍 Backend      | Python 3.10+                                     | Lenguaje base del proyecto |
|                | Django                                           | Framework web |
|                | python-decouple                                  | Lectura de variables de entorno `.env` |
| 🧠 IA y OCR     | Tesseract OCR                                    | Reconocimiento óptico de texto |
|                | OpenAI client (`together.ai`)                    | Limpieza semántica de texto con LLaMA |
| 🧾 PDF          | Poppler (pdf2image)                              | Conversión de páginas PDF a imágenes |
|                | PyMuPDF (fitz)                                   | Extracción y manipulación de PDFs |
| 📝 Word         | python-docx                                      | Generación de archivos `.docx` |
| 🎨 Frontend     | HTML, CSS                                        | Estructura base |
|                | Bootstrap 5.3.3                                   | Estilización y diseño responsive |
|                | Bootstrap Icons, FontAwesome, Animate.css        | Iconos y animaciones visuales |
|                | JavaScript / SweetAlert2                         | Alertas y validaciones |
|                | Plantillas Django (`{% block %}`)                | HTML dinámico |

---

## 📦 Instalación del proyecto

1. **Clona o descomprime el proyecto**:

```bash
git clone https://github.com/tu_usuario/CONVERTIRPDF.git
cd CONVERTIRPDF
```

2. **Crea un entorno virtual**:

```bash
python -m venv .venv
.venv\Scripts\activate  # En Windows
```

3. **Instala las dependencias**:

```bash
pip install -r requirements.txt
```

4. **Configura las herramientas necesarias en el sistema**:

- **Tesseract OCR**  
  Descarga e instala desde: https://github.com/UB-Mannheim/tesseract/wiki  
  Asegúrate de agregar al **PATH**: `C:\Program Files\Tesseract-OCR`

- **Poppler for Windows**  
  Descarga desde: https://github.com/oschwartz10612/poppler-windows/releases/  
  Extrae y agrega al **PATH**: `C:\Program Files\poppler\Library\bin`

---

## 🔑 Configuración del entorno `.env`

Crea un archivo llamado `.env` en la raíz del proyecto con el siguiente contenido:

```env
SECRET_KEY=tu_clave_django_personal
OPENAI_API_KEY=tu_clave_de_together_ai
BASE_URL=https://api.together.xyz/v1
```

> 📌 Puedes generar una `SECRET_KEY` segura aquí: https://djecrety.ir/  
> 🔐 Para obtener tu API KEY de Together.ai:
>
> 1. Ve a: https://together.ai/
> 2. Inicia sesión o crea una cuenta.
> 3. Dirígete a tu Dashboard.
> 4. Haz clic en "API Keys".
> 5. Crea una nueva clave y cópiala.
> 6. Pega esa clave como valor de `OPENAI_API_KEY` en tu `.env`

---

## 🚀 Ejecutar el servidor

Una vez configurado el entorno virtual y el archivo `.env`, ejecuta:

```bash
python manage.py runserver
```

Abre tu navegador en: [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## 🛠️ Consejos adicionales

- Verifica que Tesseract esté correctamente instalado:

```bash
tesseract --version
```

- Si no puedes instalar Poppler, asegúrate que el directorio `bin` esté incluido en el PATH correctamente.

- Ollama NO es necesario para este proyecto.  
  > Sin embargo, si deseas usar **IA local** en lugar de una API externa (Together.ai), podrías instalar Ollama desde: https://ollama.com/download y configurar el archivo `.env` así:
>
> ```env
> IA_MODE=local
> OLLAMA_BASE_URL=http://localhost:11434
> ```

---

## 🙈 ¿Qué archivos NO subir a GitHub?

Agrega un archivo `.gitignore` con lo siguiente para evitar subir archivos sensibles o innecesarios:

```
# Entorno virtual
.venv/

# Configuración privada
.env

# Archivos temporales de Python
__pycache__/
*.pyc

# Archivos de base de datos
db.sqlite3

# Archivos generados por el usuario
/media/

# Archivos del sistema
.DS_Store
Thumbs.db
```

---

## 🧠 Sobre el modelo LLaMA y IA

Este proyecto utiliza el modelo LLaMA 3 a través de la API de `Together.ai` mediante el cliente `OpenAI` compatible. Esto permite una limpieza semántica del texto extraído de los PDFs para mejorar su estructura y coherencia antes de ser exportado como Word.

---

## ✉️ Créditos

Desarrollado por: Jesús Armando Ambrosio García  
Proyecto para: Área de Transparencia, INFOTEC  
Contacto: [jesuarman74@gmail.com](mailto:jesuarman74@gmail.com)
