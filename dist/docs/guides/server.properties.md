# Server.propertis
Server.propertis - файл с основными настройками сервера.

## Параметры
```java
accepts-transfers=false                     # Разрешение на перенос игрока между серверами
allow-flight=false                          # Разрешение полёта игрокам
broadcast-console-to-ops=true               # Отправка сообщений консоли администраторам
broadcast-rcon-to-ops=true                  # Отправка сообщений RCON администраторам
bug-report-link=                            # Ссылка для отправки отчётов об ошибках
debug=false                                 # Включение режима отладки
difficulty=hard                             # Сложность игры (peaceful, easy, normal, hard)
enable-code-of-conduct=false                # Включение проверки соблюдения правил поведения
enable-jmx-monitoring=false                 # Включение JMX мониторинга
enable-query=false                          # Разрешение игрового запроса (Query protocol)
enable-rcon=false                           # Включение удалённого консольного управления (RCON)
enable-status=true                          # Включение статуса сервера для списков
enforce-secure-profile=true                 # Требование защищённого профиля игрока
enforce-whitelist=false                     # Принудительное использование белого списка
entity-broadcast-range-percentage=100       # Дистанция рассылки событий объектов в %
force-gamemode=true                         # Принудительное применение выбранного режима игры
function-permission-level=2                 # Уровень прав для команд функций
gamemode=survival                           # Режим игры по умолчанию
generate-structures=true                    # Генерация построек (деревни, храмы)
generator-settings={}                       # Настройки генератора мира
hardcore=false                              # Хардкор
hide-online-players=false                   # Скрыть список онлайн игроков
initial-disabled-packs=                     # Список отключённых паков ресурсов при старте
initial-enabled-packs=vanilla               # Список включённых паков ресурсов при старте
level-name=world                            # Название мира
level-seed=-5195936618350756684             # Сид генерации мира
level-type=minecraft:normal                 # Тип мира (normal, flat, amplified, large_biomes)
log-ips=true                                # Логирование IP игроков
management-server-allowed-origins=          # Разрешённые источники для управления сервером
management-server-enabled=false             # Включение удалённого управления сервером
management-server-host=localhost            # Хост для управления сервером
management-server-port=0                    # Порт для управления сервером
management-server-secret=...                # Секрет для управления сервером
management-server-tls-enabled=true          # Включение TLS для управления сервером
management-server-tls-keystore=             # Путь к хранилищу TLS
management-server-tls-keystore-password=    # Пароль к TLS хранилищу
max-chained-neighbor-updates=1000000        # Макс. количество последовательных обновлений блоков
max-players=50                              # Максимальное число игроков на сервере
max-tick-time=60000                         # Максимальное время тика (мс) перед остановкой сервера
max-world-size=29999984                     # Максимальный размер мира
motd=Minecraft server                       # Описание сервера в списке серверов
network-compression-threshold=256           # Порог сжатия сетевого трафика
online-mode=false                           # Проверка аккаунтов Mojang (online-mode)
op-permission-level=4                       # Уровень прав для операторов
pause-when-empty-seconds=-1                 # Время паузы при отсутствии игроков
player-idle-timeout=0                       # Время тайм-аута для неактивных игроков
prevent-proxy-connections=false             # Запрет соединений через прокси
query.port=25565                            # Порт для игрового запроса (Query protocol)
rate-limit=0                                # Ограничение частоты запросов
rcon.password=                              # Пароль для RCON
rcon.port=25565                             # Порт RCON
region-file-compression=deflate             # Тип сжатия файлов региона
require-resource-pack=false                 # Требовать ресурс-пак от игроков
resource-pack=                              # URL ресурс-пака
resource-pack-id=                           # Идентификатор ресурс-пака
resource-pack-prompt=                       # Сообщение запроса ресурс-пака
resource-pack-sha1=                         # SHA1 хеш ресурс-пака
server-ip=0.0.0.0                           # IP сервера
server-port=25565                           # Порт сервера
simulation-distance=5                       # Дистанция симуляции мира
spawn-protection=0                          # Зона защиты спавна
status-heartbeat-interval=0                 # Интервал отправки статуса на серверы списков
sync-chunk-writes=true                      # Синхронная запись чанков на диск
text-filtering-config=                      # Настройки фильтрации текста
text-filtering-version=0                    # Версия фильтрации текста
use-native-transport=true                   # Использовать нативный сетевой транспорт
view-distance=16                            # Дистанция прорисовки чанков для игроков
white-list=false                            # Включение белого списка

```