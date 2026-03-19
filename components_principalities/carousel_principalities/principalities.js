export class CarouselComponentPrincipalities {
    constructor(parent) {
        this.parent = parent;
        this.rulers = this.getRulersData();
    }

    getRulersData() { //!!!!!!!!!!!!!!!!!!!!!!!! убрать данные из компонента
        return [
            {
                name: "Даниил Александрович",
                period: "1221–1303",
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
                image: "https://vimpel-v.com/uploads/posts/2023-09/1694002498_simeon-gordyj.jpg"
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
                period: "1441–1447",
                description: "Проиграл междоусобную войну",
                image: "https://24smi.org/public/media/resize/800x-/2018/5/8/6_Ks3JcfD.jpg"
            },
            {
                name: "Междоусобная война",
                period: "1425–1453",
                description: "Борьба за великокняжеский престол",
                image: "https://ic.pics.livejournal.com/d_rebyakov/46177865/40717/40717_original.jpg"
            }
        ];
    }

    // Добавление князя (копия первого)
    addRuler() {
        const firstRuler = { ...this.rulers[0] };
        firstRuler.name = firstRuler.name + " (копия)";
        firstRuler.description = "Копия " + firstRuler.description;
        this.rulers.push(firstRuler);
        this.refreshCarousel();
    }

    // Удаление князя
    deleteRuler(index) {
        this.rulers.splice(index, 1);
        this.refreshCarousel();
    }

    // Перерисовка карусели
    refreshCarousel() {
        this.parent.innerHTML = '';
        this.render();
    }

    getIndicators(rulers) { // !!!!!!!!!!!!!!!!!!!!!!!!узнать что это ваще такое
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

    getSlides(rulers) { // !!!!!!!!!!!!!!!!!!!!!!!!вынести в компоненту: элемент карусели
        let slides = '';
        rulers.forEach((ruler, index) => {
            slides += `
                <div class="carousel-item ${index === 0 ? 'active' : ''}">
                    <img src="${ruler.image}" class="d-block w-100" style="height: 650px; object-fit: cover;" alt="${ruler.name}">
                    <div class="carousel-caption d-none d-md-block" style="background-color: rgba(0,0,0,0.7); padding: 20px; border-radius: 10px; bottom: 50px;">
                        <h3>${ruler.name}</h3>
                        <h5>Период правления: ${ruler.period}</h5>
                        <p>${ruler.description}</p>

                        <div class="mt-3">
                            <button class="btn btn-danger delete-ruler-btn" data-index="${index}">
                                Удалить
                            </button>
                            <button class="btn btn-primary" id="ruler-detail-${index}">
                                Подробнее
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        return slides;
    }

    getHTML() {
        const rulers = this.rulers;
        const indicators = this.getIndicators(rulers);
        const slides = this.getSlides(rulers);

        return `
            <div id="rulersCarousel" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    ${indicators}
                </div>
                <div class="carousel-inner">
                    ${slides}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#rulersCarousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Предыдущий</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#rulersCarousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Следующий</span>
                </button>
            </div>
        `;
    }

    render() {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        
        // Обработчики на кнопки удаления
        const deleteButtons = document.querySelectorAll('.delete-ruler-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                const index = button.getAttribute('data-index');
                this.deleteRuler(parseInt(index));
            });
        });
        
        // Обработчики на кнопки подробнее
        this.rulers.forEach((_, index) => {
            const btn = document.getElementById(`ruler-detail-${index}`);
            if (btn) {
                btn.addEventListener('click', () => {
                    const event = new CustomEvent('ruler-click', { 
                        detail: { rulerIndex: index } 
                    });
                    document.dispatchEvent(event);
                });
            }
        });
    }
}