const { database, News, Category, User } = require('./models');


describe("Models", () => {

    var user;

    beforeAll(async () => {
        await database.sync(); 
        user = await User.create({
            name: "Zezinho",
            email: "ze@uol.com.br",
            password: "123"
        })
    });

    describe("News", () => {

        test("List", async () => {
            await News.bulkCreate([
                {
                    userId: user.id,
                    title: "News 01",
                    subject: "News Subject 01",
                    content: "News Content 01",
                    image: "https://picsum.photos/1920/350?random=1",
                    publishedAt: "2022-08-31T08:00:00"
                },
                {
                    userId: user.id,
                    title: "News 02",
                    subject: "News Subject 02",
                    content: "News Content 02",
                    image: "https://picsum.photos/1920/350?random=1",
                    publishedAt: "2022-08-31T08:00:00"
                },
                {
                    userId: user.id,
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
                userId: user.id,
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
                userId: user.id,
                title: "News 01",
                subject: "News Subject 01",
                content: "News Content 01",
            })).resolves.toBeDefined();

            // Inserindo com os dados brancos
            await expect(News.create({
                userId: user.id,
                title: "",
                subject: "",
                content: "",
            })).rejects.toThrow();

            await expect(News.create({
                userId: user.id,
                title: "",
                subject: "xxx",
                content: "xxx",
            })).rejects.toThrow();

            await expect(News.create({
                userId: user.id,
                title: "xxx",
                subject: "",
                content: "xxx",
            })).rejects.toThrow();

            await expect(News.create({
                userId: user.id,
                title: "xxx",
                subject: "xxx",
                content: "",
            })).rejects.toThrow();

            // Inserindo sem data de publicação
            await expect(News.create({
                userId: user.id,
                title: "News 01",
                subject: "News Subject 01",
                content: "News Content 01",
                image: "https://picsum.photos/1920/350?random=1",
            })).resolves.toBeDefined();

            // Inserindo sem nenhuma informação
            await expect(News.create({})).rejects.toThrow();

            // Inserindo sem título
            await expect(News.create({
                userId: user.id,
                subject: "News Subject 01",
                content: "News Content 01",
                image: "https://picsum.photos/1920/350?random=1",
                publishedAt: "2022-08-31T08:00:00"
            })).rejects.toThrow();

        });

        test("Update", async () => {
            const news = await News.create({
                userId: user.id,
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
                userId: user.id,
                title: "News 01",
                subject: "News Subject 01",
                content: "News Content 01",
            });

            await expect(news.destroy()).resolves.toBeTruthy();
        });

        test("Add Category", async () => {
            const news = await News.create({
                userId: user.id,
                title: "News 01",
                subject: "News Subject 01",
                content: "News Content 01",
                categories: [
                    {
                        name: "Cat 01"
                    }
                ]
            }, {
                include: [Category]
            });

            expect(news.categories.length).toBe(1);

            const cat = await Category.create({ name: "Cat 2 "});
            await news.addCategory(cat);

            const news2 = await News.findOne({
                where: {
                    id: news.id
                },
                include: [User, Category]
            });

            expect(news2.categories.length).toBe(2);
        });
    });

    describe("Category", () => {

        test("List", async () => {
            await Category.bulkCreate([
                {
                    name: "Expreme sai sangue"
                },
                {
                    name: "Moda"
                },
                {
                    name: "Cultura"
                },
                {
                    name: "Regionais"
                }
            ])

            const categories = await Category.findAll();

            expect(categories.length).toBe(6);
        })

        test("Insert", async () => {

            const category = await Category.create({
                name: "Classificados"
            });

            expect(category.id).toBeDefined();

            await expect(Category.create({ name: "Classificados" })).rejects.toThrow();

            await expect(Category.create({})).rejects.toThrow();

            await expect(Category.create({
                name: ""
            })).rejects.toThrow();

            await expect(Category.create({
                name: "    "
            })).rejects.toThrow();
        });

        test("Update", async () => {
            const category = await Category.create({
                name: "Esportes"
            });

            category.name = "Jogos";

            await expect(category.save()).resolves.toBeDefined();

            const category2 = await Category.findOne({
                where: {
                    id: category.id
                }
            });

            expect(category2.name).toBe(category.name);
        });

        test("Delete", async () => {
            const category = await Category.create({
                name: "Esportes"
            });

            await expect(category.destroy()).resolves.toBeTruthy();
            
        })
    });

});

