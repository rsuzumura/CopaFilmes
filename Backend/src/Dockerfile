FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /src
COPY ["CopaFilmes.Api/CopaFilmes.Api.csproj", "CopaFilmes.Api/"]
RUN dotnet restore "CopaFilmes.Api/CopaFilmes.Api.csproj"
COPY . .
WORKDIR "/src/CopaFilmes.Api"
RUN dotnet build "CopaFilmes.Api.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "CopaFilmes.Api.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "CopaFilmes.Api.dll"]