const { database, News } = require('./models');

describe("News", () => {

    beforeAll(async () => {
        await database.sync();
    });

    test("List", async () => {
        await News.bulkCreate([
            {
                title: "News 01",
                subject: "News Subject 01",
                content: "News Content 01",
                image: "https://picsum.photos/1920/350?random=1",
                publishedAt: "2022-08-31T08:00:00"
            },
            {
                title: "News 02",
                subject: "News Subject 02",
                content: "News Content 02",
                image: "https://picsum.photos/1920/350?random=1",
                publishedAt: "2022-08-31T08:00:00"
            },
            {
                title: "News 03",
                subject: "News Subject 03",
                content: "News Content 03",
                image: "https://picsum.photos/1920/350?random=1",
                publishedAt: "2022-08-31T08:00:00"
            }
        ]);

        const news = await News.findAll();

        expect(news.length).toBe(3);
        expect(news[0].title).toBe("News 01");
    });

    test("Insert", async () => {  
        // Inserindo com todos os dados      
        const news = await News.create({
            title: "News 01",
            subject: "News Subject 01",
            content: "News Content 01",
            image: "https://picsum.photos/1920/350?random=1",
            publishedAt: "2022-08-31T08:00:00"
        });

        expect(news).toBeDefined();
        expect(news).not.toBeNull();
        expect(news.id).toBeDefined();
        expect(news.title).toBe("News 01");

        // Inserindo com o mínimo de dados
        await expect(News.create({
            title: "News 01",
            subject: "News Subject 01",
            content: "News Content 01",
        })).resolves.toBeDefined();

        // Inserindo com os dados brancos
        await expect(News.create({
            title: "",
            subject: "",
            content: "",
        })).rejects.toThrow();

        await expect(News.create({
            title: "",
            subject: "xxx",
            content: "xxx",
        })).rejects.toThrow();

        await expect(News.create({
            title: "xxx",
            subject: "",
            content: "xxx",
        })).rejects.toThrow();

        await expect(News.create({
            title: "xxx",
            subject: "xxx",
            content: "",
        })).rejects.toThrow();

        // Inserindo sem data de publicação
        await expect(News.create({
            title: "News 01",
            subject: "News Subject 01",
            content: "News Content 01",
            image: "https://picsum.photos/1920/350?random=1",
        })).resolves.toBeDefined();

        // Inserindo sem nenhuma informação
        await expect(News.create({})).rejects.toThrow();

        // Inserindo sem título
        await expect(News.create({
            subject: "News Subject 01",
            content: "News Content 01",
            image: "https://picsum.photos/1920/350?random=1",
            publishedAt: "2022-08-31T08:00:00"
        })).rejects.toThrow();

    });

    test("Update", async () => {
        const news = await News.create({
            title: "News 01",
            subject: "News Subject 01",
            content: "News Content 01",
        });

        news.title = "Title updated";
        await expect(news.save()).resolves.toBeTruthy();

        const news2 = await News.findOne({
            where: {
                id: news.id
            }
        });

        expect(news2.title).toBe("Title updated");

    });

    test("Delete", async () => {
        const news = await News.create({
            title: "News 01",
            subject: "News Subject 01",
            content: "News Content 01",
        });

        await expect(news.destroy()).resolves.toBeTruthy();
    });
});

