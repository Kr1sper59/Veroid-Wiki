# Фикс узла Rage 2 / Фикс подключения к Minecraft серверам
На данный момент РКН блокирует подключение к популярным хостинг провайдерам в Европе, из за чего игроки из России не могут подключится.

Но это можно легко исправить с помощью утилиты [Zapret](https://github.com/flowseal/zapret-discord-youtube)! Инструкцию по установке Zapret вы можете найти в репозитории проекта.

Для выполнения шагов ниже, пожалуйста, установите эту утилиту, и найдите конфигурацию, которая работает на вашем устройстве.

## Фикс узла Rage
1. Откройте рабочую конфигурацию Zapret в блокноте
2. Добавьте следующие параметры в конец файла:
```bash
--filter-tcp=ПОРТ_ВАШЕГО_СЕРВЕРА --ipset-exclude="%LISTS%ipset-exclude.txt" --dpi-desync-any-protocol=1 --dpi-desync-cutoff=n5 --dpi-desync=multisplit --dpi-desync-split-seqovl=582 --dpi-desync-split-pos=1 --dpi-desync-split-seqovl-pattern="%BIN%tls_clienthello_4pda_to.bin" --new ^
--filter-tcp=8080 --ipset-exclude="%LISTS%ipset-exclude.txt" --dpi-desync-any-protocol=1 --dpi-desync-cutoff=n5 --dpi-desync=multisplit --dpi-desync-split-seqovl=582 --dpi-desync-split-pos=1 --dpi-desync-split-seqovl-pattern="%BIN%tls_clienthello_4pda_to.bin" --new ^
--filter-tcp=2022 --ipset-exclude="%LISTS%ipset-exclude.txt" --dpi-desync-any-protocol=1 --dpi-desync-cutoff=n5 --dpi-desync=multisplit --dpi-desync-split-seqovl=582 --dpi-desync-split-pos=1 --dpi-desync-split-seqovl-pattern="%BIN%tls_clienthello_4pda_to.bin" --new ^

```
3. Замените 15 строку(начинается на start) на это:
```bash
start "zapret: %~n0" /min "%BIN%winws.exe" --wf-tcp=80,443,2053,2083,2087,2096,8443,ПОРТ_ВАШЕГО_СЕРВЕРА,8080,2022,%GameFilter% --wf-udp=443,19294-19344,50000-50100,%GameFilter% ^
```
4. Добавьте домен de.veroid.net в файл ipset-exclude.txt в папке lists
5. Запустите конфигурацию через service.bat
> :warning: Не забудьте установить порт вашего сервера в 2 и 3 шагах!

Выполненные ранее шаги заставят Zapret работать с портами 8080, 2022 и портом вашего сервера.

## Фикс подключения к Minecraft серверам
1. Откройте рабочую конфигурацию Zapret в блокноте
2. Добавьте следующие параметры в конец файла:
```bash
--filter-tcp=25565 --ipset-exclude="%LISTS%ipset-exclude.txt" --dpi-desync-any-protocol=1 --dpi-desync-cutoff=n5 --dpi-desync=multisplit --dpi-desync-split-seqovl=582 --dpi-desync-split-pos=1 --dpi-desync-split-seqovl-pattern="%BIN%tls_clienthello_4pda_to.bin" --new ^

```
3. Замените 15 строку(начинается на start) на это:
```bash
start "zapret: %~n0" /min "%BIN%winws.exe" --wf-tcp=80,443,2053,2083,2087,2096,8443,25565,%GameFilter% --wf-udp=443,19294-19344,50000-50100,%GameFilter% ^
```
4. Добавьте домен сервера, на который вы хотите зайти в файл ipset-exclude.txt в папке lists
5. Запустите конфигурацию через service.bat

Выполненные ранее шаги заставят Zapret работать с портом 25565(дефолтный порт). Если порт вашего сервера отличается от дефолтного - поменяйте его в настройках сервера