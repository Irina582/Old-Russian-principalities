import { BackButtonComponentPrincipalities } from "../../components_principalities/back-button_principalities/principalities.js";
import { ProductComponentPrincipalities } from "../../components_principalities/product_principalities/principalities.js";
import { MainPagePrincipalities } from "../main_principalities/principalities.js";

export class ProductPagePrincipalities {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id; 
    }

    // Получаем данные о князьях 
    getRulersData() {
        return [
            { name: "Даниил Александрович", period: "1221–1303", description: "Первый удельный князь Московский. Сын Александра Невского, основатель династии московских князей.", src: "https://pic.rutubelist.ru/video/d3/e6/d3e6dae8d96798d1afe1744a968f04fb.jpg" },
            { name: "Юрий Данилович", period: "1303–1325", description: "Вел борьбу за великое княжение с тверскими князьями. Женился на сестре хана Узбека.", src: "https://avatars.mds.yandex.net/i?id=7407f04c8423986f4f2e49f7cedeabd3eec11f2f-4539046-images-thumbs&n=13" },
            { name: "Иван I Данилович Калита", period: "1325–1340", description: "Собиратель русских земель. Получил право сбора дани для Орды. Перенёс митрополичью кафедру в Москву.", src: "https://kulturologia.ru/files/u29141/2914117110.jpg" },
            { name: "Семён Иванович Гордый", period: "1340–1353", description: "Продолжил политику отца. Старший сын Ивана Калиты. Продолжил политику отца по собиранию русских земель. Первым из московских князей стал называться 'великим князем всея Руси'. Умер от чумы.", src: "https://vimpel-v.com/uploads/posts/2023-09/1694002498_simeon-gordyj.jpg" },
            { name: "Иван II Иванович Красный", period: "1353–1359", description: "Кроткий и милостивый. Второй сын Ивана Калиты. Прозвище 'Красный' означало 'красивый'. Был мягким и добрым правителем, за что получил также прозвище 'Кроткий'. Продолжал дело отца и брата.", src: "https://cdnstatic.rg.ru/uploads/images/2024/11/13/ivan-krasnyi-1200_a18.jpg" },
            { name: "Дмитрий Иванович Донской", period: "1359–1389", description: "Победитель в Куликовской битве. Сын Ивана Красного, внук Ивана Калиты. Стал князем в 9 лет. Одержал победу в Куликовской битве 1380 года, после которой получил прозвище 'Донской'. Впервые передал великое княжение сыну без ханского ярлыка.", src: "https://www.pravmir.ru/wp-content/uploads/2020/10/donskij.jpeg" },
            { name: "Василий I Дмитриевич", period: "1389–1425", description: "Присоединил Нижегородское княжество. Старший сын Дмитрия Донского. Присоединил Нижегородское княжество, Суздаль, Муром. Успешно боролся с Литвой и Ордой. Был женат на литовской княжне Софье Витовтовне.", src: "https://budzma.org/upload/resize_cache/medialibrary/9a4/820_654_1/wgz8igk7q2he49zakd5jxlwror6b670p.jpg" },
            { name: "Василий II Васильевич Тёмный", period: "1425–1433, 1433–1434", description: "Ослеплён в ходе Междоусобной войны. Сын Василия I. Пережил жестокую междоусобную войну с дядей и двоюродными братьями. Был ослеплён по приказу Дмитрия Шемяки, отчего получил прозвище 'Тёмный'. Несмотря на слепоту, продолжал править и укрепил власть Москвы.", src: "https://ic.pics.livejournal.com/pantv/14908973/12061325/12061325_800.jpg" },
            { name: "Юрий Дмитриевич", period: "1433", description: "Сын Дмитрия Донского, дядя Василия II. Боролся за великокняжеский престол, считая себя более достойным по старому порядку наследования. Недолго занимал престол в 1433 году, умер в 1434-м.", src: "https://ruhistor.ru/wp-content/uploads/2022/04/yurij-dmitrievich-galickij-i-zvenigorodskij-768x483.jpg" },
            { name: "Дмитрий Юрьевич Шемяка", period: "1441–1447", description: "Проиграл Междоусобную войну. Сын Юрия Дмитриевича, двоюродный брат Василия II. Главный противник Василия Тёмного в междоусобной войне. Ослепил Василия II, сам дважды захватывал Москву. В итоге проиграл войну и был отравлен в Новгороде.", src: "https://24smi.org/public/media/resize/800x-/2018/5/8/6_Ks3JcfD.jpg" },
            { name: "Междоусобная война", period: "1425–1453", description: "Борьба за великокняжеский престол между потомками Дмитрия Донского. Война между Василием Тёмным и его дядей Юрием, а затем двоюродными братьями — Василием Косым и Дмитрием Шемякой. Закончилась победой Василия II и укреплением единовластия.", src: "https://ic.pics.livejournal.com/d_rebyakov/46177865/40717/40717_original.jpg" },
        ];
    }

    getData() {
        const rulers = this.getRulersData();
        const ruler = rulers[this.id - 1] || rulers[0];
        
        return {
            id: this.id,
            src: ruler.src,
            title: ruler.name,
            text: `${ruler.description}\n\nПериод правления: ${ruler.period}`
        };
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `<div id="product-page"></div>`;
    }

    clickBack() {
        const mainPage = new MainPagePrincipalities(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const backButton = new BackButtonComponentPrincipalities(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        const data = this.getData();
        const stock = new ProductComponentPrincipalities(this.pageRoot);
        stock.render(data);
    }
}