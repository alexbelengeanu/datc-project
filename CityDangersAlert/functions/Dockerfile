FROM mcr.microsoft.com/dotnet/sdk:6.0 AS installer-env

EXPOSE 8080

# Build requires 3.1 SDK
COPY --from=mcr.microsoft.com/dotnet/sdk:6.0 /usr/share/dotnet /usr/share/dotnet

COPY . /src/dotnet-function-app
RUN cd /src/dotnet-function-app && \
    mkdir -p /home/site/wwwroot && \
    dotnet publish *.csproj --output /home/site/wwwroot

# To enable ssh & remote debugging on app service change the base image to the one below
# FROM mcr.microsoft.com/azure-functions/dotnet:4-appservice
FROM mcr.microsoft.com/azure-functions/dotnet:4
ENV AzureWebJobsScriptRoot=/home/site/wwwroot \
    AzureFunctionsJobHost__Logging__Console__IsEnabled=true \
    datcprojectmq_SERVICEBUS="Endpoint=sb://datc-project-mq.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=Z9xd7HxiJUmO+JJEx/4SygysvfUE+IPiSBWOWJ5U5rw="

COPY --from=installer-env ["/home/site/wwwroot", "/home/site/wwwroot"]