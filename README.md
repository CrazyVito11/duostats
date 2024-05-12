# Duostats
Simple website that gets some more detailed stats from Duolingo.

<img src="./assets/ui_preview.png" alt="Screenshot of the Duostats application" width="500" />


## Known issues
There are a couple of known issues that have a very minimal impact, but are reported here.

- An unofficial icon is used for the streak repaired statistic due to a lack of the original in SVG format.
    - If you have the official icon in SVG format, then please let me know or create a pull request with the unofficial icon replaced.
- The streak repaired statistic might be higher than the actual amount that you used.
    - We don't know the real reason, but our best guess is that Duolingo marks the streak as repaired after an outage.
    - We are unsure if we can resolve this issue in the future and for this reason this warning has also been implemented on the site itself.


## Setup
To setup an environment for general use, you need to follow these steps:

1. Make sure you meet the follow prerequisites
    - Docker + Docker Compose have been installed
    - The [Traefik reverse proxy container](https://github.com/CrazyVito11/traefik-reverse-proxy) has been configured
    - A registered domain name
        - You can use something like [PiHole](https://github.com/pi-hole/pi-hole) to register local domains if you aren't going to host it publicly
2. Clone this repository to your server
3. Make a copy of `.env.example` and call it `.env`
4. Edit the variables in `.env` until they fit your situation
    - Your domain name can be entered in here for example
5. Build the container with `docker compose build`

The container should now be ready, simply start it with `docker compose up -d` and try visiting your domain!


## Setup (Development)
To setup an environment for development, you need to follow these steps:

1. Make sure you meet the follow prerequisites
    - Docker + Docker Compose have been installed
    - The [Traefik reverse proxy container](https://github.com/CrazyVito11/traefik-reverse-proxy) has been configured
2. Clone this repository to your development machine
3. Make a copy of `.env.example` and call it `.env`
4. Edit the variables in `.env` until they fit your situation
    - It's recommended that use use an `.localhost` domain, as this doesn't require any custom DNS settings of servers
5. Build the container with `docker compose -f development.docker-compose.yml build`

The container should now be ready, simply start it with `docker compose -f development.docker-compose.yml up -d` and try visiting your localhost environment!
