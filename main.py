import eel

@eel.expose
def save_file(content):
    with open("text", 'w', encoding='utf-8') as file:
        print(content)
        file.write(content)




eel.init("web")
eel.start("index.html", size=(1080, 1920), position=(200,200), shutdown_delay=10.0, mode='chrome', host="localhost", port="8000")
