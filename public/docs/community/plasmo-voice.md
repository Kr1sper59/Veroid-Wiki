# Настройка PlasmoVoice в связке с Velocity

**С чего стоит начинать?**
Для начала нужно установить последнюю поддерживаемую версию плагина для Velocity и непосредственно для самого Bukkit сервера. (https://github.com/plasmoapp/plasmo-voice/releases/tag/2.1.0-SNAPSHOT)

**Далее, перейдем к самому серверу Velocity**
Открываем файл `PlasmoVoice/config.toml` и заполняем следующим образом:

```
default_language = "ru_ru"
debug = false
use_crowdin_translations = true
check_for_updates = true
mtu_size = 1024

[servers]
vanilla = "айпи и порт вашего bukkit сервера" #указываете айпи вашего bukkit сервера и основной порт подключения

[host]
ip = "0.0.0.0" #нетрогаем
port = основной порт velocity
```

После копируем файл `PlasmoVoice/forwarding-secret` и вставляем его в папку плагина bukkit сервера. 

**Настройка Bukkit сервера**
Мы уже копировали файл `forwarding-secret` и переходим к настройке `config.toml`:

```
server_id = "здесь будет id вашего сервера" #ничено не трогаем
default_language = "ru_ru"
debug = false
disable_crowdin = false
check_for_updates = false

[host]
ip = "0.0.0.0"
port = указываем основной порт вашего bukkit сервера

[host.public]
ip = "айпи velocity сервера" #только айпи(если Velocity и Bukkit сервера стоят на одной ноде, то указываем 172.18.0.1)
port = дополнительный порт bukkit сервера

[voice]
sample_rate = 48000
keep_alive_timeout_ms = 15000
mtu_size = 1024
client_mod_required = false
client_mod_required_check_timeout_ms = 3000

[voice.proximity]
distances = [8, 16, 32]
default_distance = 16

[voice.opus]
mode = "VOIP"
bitrate = -1000

[voice.weights]
```

Заходим на сервер и проверяем

**Автор статьи - makromjc**