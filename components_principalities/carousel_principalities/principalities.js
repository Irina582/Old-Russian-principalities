export class CarouselComponentPrincipalities {
    constructor(parent) {
        this.parent = parent;
    }

    // Метод для получения данных (можно потом вынести в отдельный файл)
    getRulersData() {
        return [
            {
                name: "Даниил Александрович",
                period: "1276–1303",
                description: "Первый удельный князь Московский",
                image: "https://pic.rutubelist.ru/video/d3/e6/d3e6dae8d96798d1afe1744a968f04fb.jpg"
            },
            {
                name: "Юрий Данилович",
                period: "1303–1325",
                description: "Вел борьбу за великое княжение",
                image: "https://avatars.mds.yandex.net/i?id=7407f04c8423986f4f2e49f7cedeabd3eec11f2f-4539046-images-thumbs&n=13"
            },
            {
                name: "Иван I Данилович Калита",
                period: "1325–1340",
                description: "Собиратель русских земель",
                image: "https://kulturologia.ru/files/u29141/2914117110.jpg"
            },
            {
                name: "Семён Иванович Гордый",
                period: "1340–1353",
                description: "Продолжил политику отца",
                image: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_681365f47650c106adb5b1b1_6813665337ab0a2d307f162e/scale_1200"
            },
            {
                name: "Иван II Иванович Красный",
                period: "1353–1359",
                description: "Кроткий и милостивый",
                image: "https://cdnstatic.rg.ru/uploads/images/2024/11/13/ivan-krasnyi-1200_a18.jpg"
            },
            {
                name: "Дмитрий Иванович Донской",
                period: "1359–1389",
                description: "Победитель в Куликовской битве",
                image: "https://www.pravmir.ru/wp-content/uploads/2020/10/donskij.jpeg"
            },
            {
                name: "Василий I Дмитриевич",
                period: "1389–1425",
                description: "Присоединил Нижегородское княжество",
                image: "https://budzma.org/upload/resize_cache/medialibrary/9a4/820_654_1/wgz8igk7q2he49zakd5jxlwror6b670p.jpg"
            },
            {
                name: "Василий II Васильевич Тёмный",
                period: "1425–1433, 1433–1434",
                description: "Ослеплён в ходе междоусобной войны",
                image: "https://ic.pics.livejournal.com/pantv/14908973/12061325/12061325_800.jpg"
            },
            {
                name: "Юрий Дмитриевич",
                period: "1433",
                description: "Сын Дмитрия Донского",
                image: "https://ruhistor.ru/wp-content/uploads/2022/04/yurij-dmitrievich-galickij-i-zvenigorodskij-768x483.jpg"
            },
            {
                name: "Дмитрий Юрьевич Шемяка",
                period: "1446–1447",
                description: "Проиграл междоусобную войну",
                image: "https://24smi.org/public/media/resize/800x-/2018/5/8/6_Ks3JcfD.jpg"
            },
            {
                name: "Междоусобная война",
                period: "1425–1453",
                description: "Борьба за великокняжеский престол между потомками Дмитрия Донского",
                image: "https://ic.pics.livejournal.com/d_rebyakov/46177865/40717/40717_original.jpg"
            }
        ];
    }

    // Метод для создания индикаторов (точечек)
    getIndicators(rulers) {
        let indicators = '';
        rulers.forEach((_, index) => {
            indicators += `
                <button type="button" data-bs-target="#rulersCarousel" 
                    data-bs-slide-to="${index}" 
                    ${index === 0 ? 'class="active" aria-current="true"' : ''} 
                    aria-label="Slide ${index + 1}">
                </button>
            `;
        });
        return indicators;
    }

    // Метод для создания слайдов
    getSlides(rulers) {
        let slides = '';
        rulers.forEach((ruler, index) => {
            slides += `
                <div class="carousel-item ${index === 0 ? 'active' : ''}">
                    <img src="${ruler.image}" class="d-block w-100" style="height: 500px; object-fit: cover;" alt="${ruler.name}">
                    <div class="carousel-caption d-none d-md-block" style="background-color: rgba(0,0,0,0.7); padding: 20px; border-radius: 10px; bottom: 50px;">
                        <h3>${ruler.name}</h3>
                        <h5>Период правления: ${ruler.period}</h5>
                        <p>${ruler.description}</p>
                    </div>
                </div>
            `;
        });
        return slides;
    }

    // Главный метод, который собирает всю карусель
    getHTML() {
        const rulers = this.getRulersData();
        const indicators = this.getIndicators(rulers);
        const slides = this.getSlides(rulers);

        return `
            <div id="rulersCarousel" class="carousel slide" data-bs-ride="carousel">
                <!-- Индикаторы (точечки) -->
                <div class="carousel-indicators">
                    ${indicators}
                </div>
                
                <!-- Слайды -->
                <div class="carousel-inner">
                    ${slides}
                </div>
                
                <!-- Стрелки навигации -->
                <button class="carousel-control-prev" type="button" data-bs-target="#rulersCarousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true" style="background-color: rgba(0,0,0,0.5); border-radius: 50%; padding: 20px;"></span>
                    <span class="visually-hidden">Предыдущий</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#rulersCarousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true" style="background-color: rgba(0,0,0,0.5); border-radius: 50%; padding: 20px;"></span>
                    <span class="visually-hidden">Следующий</span>
                </button>
            </div>
        `;
    }

    render() {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}