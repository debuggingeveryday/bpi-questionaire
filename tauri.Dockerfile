FROM debian:stable-slim

WORKDIR /app

RUN apt update && \
    apt install -y libwebkit2gtk-4.0-dev \
    build-essential \
    curl \
    wget \
    file \
    libssl-dev \
    libgtk-3-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev

RUN apt update

RUN curl https://sh.rustup.rs -sSf | bash -s -- -y

RUN echo 'source $HOME/.cargo/env' >> $HOME/.bashrc

CMD ["rustup", "update"]

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -s -- -y && \
    apt-get install -y nodejs
