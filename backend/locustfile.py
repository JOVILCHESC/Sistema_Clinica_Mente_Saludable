# backend/locustfile.py

from locust import HttpUser, task, between
import random
import string

class ClinicaUser(HttpUser):
    # Para que el IDE no muestre “Attribute 'token' defined outside __init__”, 
    # inicializamos token aquí a None
    token = None

    wait_time = between(1, 3)

    def on_start(self):
        """
        Este método se ejecuta una vez por usuario virtual
        justo después de crearse, y antes de ejecutar las tareas.
        Aquí hacemos el POST /api/auth/login para obtener el JWT.
        """
        response = self.client.post(
            "/api/auth/login",
            json={"email": "rocky@gmail.com", "password": "admin123"},
            verify=False  # Desactiva la verificación de certificado autofirmado
        )
        # Para debug, imprimimos el status y el body
        print(f"[Locust] /api/auth/login → {response.status_code} | {response.text}")

        if response.status_code == 200:
            self.token = response.json().get("token")
        else:
            self.token = None

    @task(2)
    def get_notes(self):
        """
        Ejecuta GET /api/notes con el token de autorización.
        Sólo si self.token no es None.
        """
        if self.token:
            res = self.client.get(
                "/api/notes",
                headers={"Authorization": f"Bearer {self.token}"},
                verify=False
            )
            # Para debug, imprimimos el resultado
            print(f"[Locust] GET /api/notes → {res.status_code}")

    @task(1)
    def create_note(self):
        """
        Crea una nota aleatoria con POST /api/notes.
        Sólo si self.token no es None.
        """
        if self.token:
            title = "Nota " + "".join(random.choices(string.ascii_letters, k=5))
            body  = "Contenido " + "".join(random.choices(string.ascii_letters + " ", k=20))
            res = self.client.post(
                "/api/notes",
                json={"title": title, "body": body},
                headers={"Authorization": f"Bearer {self.token}"},
                verify=False
            )
            # Para debug, imprimimos el resultado
            print(f"[Locust] POST /api/notes → {res.status_code} | título='{title}'")

