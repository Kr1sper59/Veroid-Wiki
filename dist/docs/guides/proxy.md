# Настройка прокси сервера

Прокси-сервер нужен для объединения нескольких серверов в одну сеть с удобным переключением между ними.

## Velocity

[Velocity](https://papermc.io/software/velocity) - прокси ядро от разработчиков Paper, одно из самых популярных и простых в настройке.

### Настройка

Настройка выполняется в файле **velocity.toml**.
Ниже показаны параметры, которые стоит изменить для корректной работы:

```toml
# Измените порт на тот, который указан в IP-адресе вашего сервера
bind = "0.0.0.0:25565"

# Описание сервера в списке серверов(можно не менять)
motd = "<#09add3>A Velocity Server"

# Измените на false если хотите играть без лицензии
online-mode = true

# Измените значение на MODERN
player-info-forwarding-mode = "MODERN"

[servers]
# Настройка игровых серверов, к которым подключается прокси
lobby = "172.0.18.1:10002"
main = "172.0.18.1:10001"

# Порядок серверов, куда подключать игроков по умолчанию
try = [
    "lobby"
]

# Удалите тестовые значения и оставьте только нужные маршруты
[forced-hosts]
"lobby.example.com" = [
    "lobby"
]
"factions.example.com" = [
    "factions"
]
"minigames.example.com" = [
    "minigames"
]
```

> ⚠️ Если вы не используете поддомены, блок **[forced-hosts]** можно оставить пустым.

После настройки скопируйте содержимое **forwarding.secret** и выполните следующие шаги на серверах, которые подключаются через Velocity:

1. Откройте файл **config/paper-global.yml**.
2. Найдите и замените блок конфигурации, отвечающий за Velocity:

```yml
  velocity:
    enabled: true
    online-mode: false # Укажите значение как в конфигурации Velocity.
    secret: # Вставьте содержимое файла forwarding.secret с Velocity.
```

3. Перезапустите сервер.

## Waterfall

[Waterfall](https://papermc.io/software/waterfall/) - прокси ядро от разработчиков Paper на основе BungeeCord. Хорошо подходит для связки серверов на старых версиях.

### Настройка
Настройка выполняется в файле **config.yml**.

Замените содержимое файла на следующее:

```yaml
network_compression_threshold: 256
remote_ping_timeout: 5000
# Измените на false если хотите играть без лицензии
online_mode: true
remote_ping_cache: -1
forge_support: true
max_packets_per_second: 4096
# Настройка игровых серверов, к которым подключается прокси
servers:
  lobby:
    motd: '&1Just another Waterfall - Forced Host'
    address: 172.0.18.1:10002  # Укажите адрес вашего лобби-сервера
    restricted: false
  main:
    motd: '&1Just another Server'
    address: 172.0.18.1:10001  # Укажите адрес вашего основного сервера
    restricted: false
disabled_commands:
- disabledcommandhere
max_packets_data_per_second: 33554432
reject_transfers: false
player_limit: -1
prevent_proxy_connections: false
connection_throttle_limit: 3
connection_throttle: 4000
log_commands: false
log_pings: true
groups:
  md_5:
  - admin
stats: ebfcc742-fe58-44ae-ada3-00e90f578160
# Включите для передачи реального IP игрока на игровые серверы
ip_forward: true
permissions:
  default:
  - bungeecord.command.server
  - bungeecord.command.list
  admin:
  - bungeecord.command.alert
  - bungeecord.command.alertraw
  - bungeecord.command.end
  - bungeecord.command.ip
  - bungeecord.command.reload
  - bungeecord.command.kick
  - bungeecord.command.send
  - bungeecord.command.find
  - bungeecord.command.perms
listeners:
- # Измените порт на тот, который указан в IP-адресе вашего сервера
  host: 0.0.0.0:25565
  query_port: 25573
  # Описание сервера в списке серверов (можно не менять)
  motd: '&1Another Bungee server'
  max_players: 1
  force_default_server: false
  tab_size: 60
  # Настройка поддоменов — удалите пример и добавьте свои, или оставьте пустым
  forced_hosts:
    lobby.example.com: lobby
    main.example.com: main
  tab_list: GLOBAL_PING
  bind_local_address: true
  ping_passthrough: false
  query_enabled: false
  proxy_protocol: false
  # Порядок серверов, куда подключать игроков по умолчанию
  priorities:
  - lobby
enforce_secure_profile: false
server_connect_timeout: 5000
timeout: 30000
```

> ⚠️ Если вы не используете поддомены, блок **forced_hosts** можно оставить пустым.

После настройки выполните следующие шаги на серверах, которые подключаются через Waterfall:

1. Откройте файл **server.properties** на каждом игровом сервере и установите:
```properties
online-mode=false
```
2. Откройте файл **spigot.yml** и включите поддержку BungeeCord:
```yaml
settings:
  bungeecord: true
```
3. Перезапустите сервер.

> ⚠️ **online-mode=false** необходим, так как проверку лицензии берёт на себя Waterfall. Обязательно закройте порты игровых серверов на уровне файрвола — иначе игроки смогут подключиться напрямую, минуя прокси.