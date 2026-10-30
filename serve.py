# Dev server: like `python -m http.server`, but never lets the browser reuse stale files.
# Mixing edited ES modules with old cached ones leaves the page blank.
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class NoCacheHandler(SimpleHTTPRequestHandler):
    def is_page(self):
        return self.path.split('?')[0] in ('/', '/index.html')

    def do_GET(self):
        # Always send the page itself in full, so the Clear-Site-Data header below reaches the browser.
        if self.is_page():
            del self.headers['If-Modified-Since']
        super().do_GET()

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        if self.is_page():
            # Wipes copies cached before this server existed (the old server sent no cache headers).
            self.send_header('Clear-Site-Data', '"cache"')
        super().end_headers()


if __name__ == '__main__':
    handler = partial(NoCacheHandler, directory=Path(__file__).parent)
    print('Serving on http://localhost:8000')
    ThreadingHTTPServer(('', 8000), handler).serve_forever()
