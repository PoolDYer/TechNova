#!/usr/bin/env python3
import requests
import json
import time

BASE_URL = "http://localhost:3001/api"

print("=" * 60)
print("PRUEBA DE FUNCIONALIDADES")
print("=" * 60)

# Test 1: Health Check
print("\n1️⃣  PRUEBA: Health Check del Servidor")
print("-" * 60)
try:
    response = requests.get(f"{BASE_URL}/health", timeout=5)
    print(f"✅ Status Code: {response.status_code}")
    print(f"✅ Response: {response.json()}")
except Exception as e:
    print(f"❌ Error: {str(e)}")

# Test 2: DNI Autocomplete
print("\n2️⃣  PRUEBA: Autocompletado con DNI")
print("-" * 60)
test_dni = "12345678"  # DNI de prueba
try:
    response = requests.get(f"{BASE_URL}/dni/{test_dni}", timeout=10)
    print(f"Status Code: {response.status_code}")
    data = response.json()
    print(f"Response: {json.dumps(data, indent=2, ensure_ascii=False)}")
    
    if data.get('success'):
        print("✅ El endpoint de DNI está funcionando")
    else:
        print("⚠️  El DNI no fue encontrado (esperado para DNI de prueba)")
except Exception as e:
    print(f"❌ Error: {str(e)}")

# Test 3: Email Notification
print("\n3️⃣  PRUEBA: Envío de Correo de Confirmación")
print("-" * 60)
test_order = {
    "customer": {
        "firstName": "Juan",
        "lastName": "Pérez García",
        "dni": "12345678",
        "email": "enzocostareyes@gmail.com",  # Email de prueba
        "phone": "999999999",
        "address": "Calle Principal 123",
        "city": "Lima"
    },
    "orderId": "ORDER123456",
    "items": [
        {
            "id": "1",
            "name": "ZenBook Pro Duo",
            "price": 9499,
            "quantity": 1
        },
        {
            "id": "7",
            "name": "MX Master 3S",
            "price": 389,
            "quantity": 2
        }
    ],
    "total": 10277,
    "paymentMethod": "Tarjeta de Crédito"
}

try:
    response = requests.post(
        f"{BASE_URL}/send-order-confirmation",
        json=test_order,
        timeout=10
    )
    print(f"Status Code: {response.status_code}")
    data = response.json()
    print(f"Response: {json.dumps(data, indent=2, ensure_ascii=False)}")
    
    if response.status_code == 200 and data.get('success'):
        print("✅ ¡Correo de confirmación enviado exitosamente!")
    else:
        print("❌ Error al enviar el correo")
except Exception as e:
    print(f"❌ Error: {str(e)}")

print("\n" + "=" * 60)
print("RESUMEN DE PRUEBAS")
print("=" * 60)
print("✅ Servidor de email: http://localhost:3001")
print("📧 Email configurado: fudjsidirjxyfjf@gmail.com")
print("🆔 Endpoint DNI: /api/dni/{dni}")
print("📬 Endpoint Email: /api/send-order-confirmation")
print("=" * 60)
