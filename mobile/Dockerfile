FROM debian:11-slim

RUN apt-get --quiet update --yes
RUN apt-get --quiet install --yes wget tar unzip lib32stdc++6 lib32z1 xz-utils git openjdk-17-jdk

RUN wget --quiet --output-document=commandlinetools.zip https://dl.google.com/android/repository/commandlinetools-linux-10406996_latest.zip

RUN unzip -d /usr/local/android-sdk commandlinetools.zip && \
    rm commandlinetools.zip

RUN mkdir -p /usr/local/cmdline-tools/latest && \
    mv /usr/local/android-sdk/cmdline-tools/* /usr/local/cmdline-tools/latest/

ENV PATH $PATH:/usr/local/cmdline-tools/latest/bin

ENV ANDROID_HOME /usr/local
ENV PATH $PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools

RUN yes | sdkmanager --licenses
RUN sdkmanager "platforms;android-34" "build-tools;30.0.3"

RUN wget --output-document=flutter-sdk.tar.xz "https://storage.googleapis.com/flutter_infra_release/releases/stable/linux/flutter_linux_3.16.3-stable.tar.xz" && \
  tar xvf flutter-sdk.tar.xz && \
  rm -rf flutter-sdk.tar.xz
ENV PATH $PATH:$PWD/flutter/bin:$PWD/flutter/bin/cache/dart-sdk

RUN flutter doctor

RUN git config --global --add safe.directory /flutter

# Copy the app
COPY . /app
WORKDIR /app

# Build the app
RUN flutter build apk --release

# Place the app in the shared volume
RUN mkdir -p /app/shared
RUN cp build/app/outputs/flutter-apk/app-release.apk /app/shared/app-release.apk
