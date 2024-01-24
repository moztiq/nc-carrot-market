# Carrot Market

Serverless Carrot Market Clone using NextJS, Tailwind, Prisma, PlanetScale and Cloudflare.

## Prisma Setup

```shell
npm i -D prisma
npx prisma init
```

## PlanetScale Setup

```shell
brew install planetscale/tap/pscale
brew install mysql-client # optional
brew upgrade pscale # upgrade to latest version

pscale auth login
pscale region list
pscale database create nc-carrot-market --region gcp-asia-northeast3
pscale connect nc-carrot-market
```

## Prisma & PlanetScale

```shell
# after making models
npx prisma db push
npx prisma studio
npm i @prisma/client # not dev dependency
npx prisma generate 
```
