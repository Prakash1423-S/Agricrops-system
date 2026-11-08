#!/usr/bin/env python3
"""
AgriCrops Pro - Python Backend Service
Provides REST API endpoints for Crop Advisory, Folder/Dossier inspection,
and serves the web application frontend.
"""

import os
import json
import http.server
import socketserver
import urllib.parse

PORT = 8000
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

class AgriCropsHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def do_GET(self):
        parsed_url = urllib.parse.urlparse(self.path)
        
        # API Endpoints
        if parsed_url.path == "/api/status":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            response = {
                "system": "AgriCrops Pro Intelligence Engine",
                "status": "online",
                "version": "2.4.0",
                "features": ["Crop Q&A", "Cultivation Steps", "Fertilizer Schedule", "Soil Balancing", "Weather Matcher"]
            }
            self.wfile.write(json.dumps(response).encode("utf-8"))
            return

        elif parsed_url.path == "/api/crops":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            # Return JSON listing
            crops_file = os.path.join(BASE_DIR, "backend", "api_routes.json")
            if os.path.exists(crops_file):
                with open(crops_file, "r", encoding="utf-8") as f:
                    self.wfile.write(f.read().encode("utf-8"))
            else:
                self.wfile.write(json.dumps({"message": "Crops dataset available in frontend js/crops_data.js"}).encode("utf-8"))
            return

        # Default: serve static files (index.html, css, js, data)
        return super().do_GET()

def run_server():
    os.chdir(BASE_DIR)
    print(f"==================================================")
    print(f"🌾 AgriCrops Pro Server running at http://localhost:{PORT}")
    print(f"📁 Serving files from: {BASE_DIR}")
    print(f"Press Ctrl+C to stop the server.")
    print(f"==================================================")
    
    with socketserver.TCPServer(("", PORT), AgriCropsHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down AgriCrops server.")
            httpd.server_close()

if __name__ == "__main__":
    run_server()
