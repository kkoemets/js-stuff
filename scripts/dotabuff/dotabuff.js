import fetch from 'node-fetch'
import cheerio from 'cheerio'

const host = 'https://www.dotabuff.com'

const findHeroes = async () =>
    cheerio
        .load(await (await fetch(`${host}/heroes/winning`)).text())(
            '.sortable tbody tr',
        )
        .toArray()
        .map((row) => {
            const element = cheerio.load(row)('tr td a')
            return { hero: element.text(), href: element.attr('href') }
        })

const parse = async () => {
    const heroes = await findHeroes()
    const heroesWithHtml = (
        await Promise.all(
            heroes.map(async ({ hero, href }) => ({
                hero,
                html: await (await fetch(host + href)).text(),
            })),
        )
    ).slice(0, 1)
    console.log(heroesWithHtml)

    heroesWithHtml.map(({ html }) => {
        const $ = cheerio.load(html)

        return console.log($)
    })
}

parse()
