import { BackButtonComponentPrincipalities } from "../../components_principalities/back-button_principalities/principalities.js";
import { ProductComponentPrincipalities } from "../../components_principalities/product_principalities/principalities.js";
import { MainPagePrincipalities } from "../main_principalities/principalities.js";
import { rulersData } from "../../data_principalities/principalities.js";

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class ProductPagePrincipalities {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getData() {
        const principality = rulersData[this.id];
        
        if (!principality) {
            return {
                id: this.id,
                src: "",
                title: "Княжество не найдено",
                text: "Извините, информация о данном княжестве отсутствует",
                model3d: null
            };
        }
        
        return {
            id: this.id,
            src: principality.image,
            title: principality.name,
            text: `${principality.fullDescription}\n\nПериод существования: ${principality.start} - ${principality.end}`,
            model3d: principality.model3d || null
        };
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `
            <div id="product-page">
                <div id="back-button-container"></div>
                <div id="text-content" class="mt-3"></div>
                <div id="viewer-container" style="margin-top: 30px; text-align: center;">
                    <canvas id="viewer-canvas" style="width: 400px; height: 400px; background: #2a2a2a; border-radius: 12px; margin: 0 auto; display: block;"></canvas>
                    <div style="display: flex; gap: 12px; justify-content: center; margin-top: 16px;">
                        <button id="zoom-in" class="btn btn-secondary">+ Приблизить</button>
                        <button id="zoom-out" class="btn btn-secondary">- Отдалить</button>
                        <button id="view-front" class="btn btn-secondary">Спереди</button>
                        <button id="view-back" class="btn btn-secondary">Сзади</button>
                        <button id="view-left" class="btn btn-secondary">Слева</button>
                        <button id="view-right" class="btn btn-secondary">Справа</button>
                    </div>
                </div>
            </div>
        `;
    }

    clickBack() {
        const mainPage = new MainPagePrincipalities(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const backButtonContainer = document.getElementById('back-button-container');
        const backButton = new BackButtonComponentPrincipalities(backButtonContainer);
        backButton.render(this.clickBack.bind(this));

        const data = this.getData();
        
        const textContainer = document.getElementById('text-content');
        const stock = new ProductComponentPrincipalities(textContainer);
        stock.render(data);
        
        if (data.model3d) {
            setTimeout(() => {
                this.init3DViewer(data.model3d);
            }, 100);
        }
    }

    init3DViewer(modelPath) {
        const canvas = document.getElementById('viewer-canvas');
        
        canvas.width = 400;
        canvas.height = 400;
        
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
        renderer.setSize(400, 400, false);
        renderer.setClearColor(0x2a2a2a, 1);
        
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x2a2a2a);
        
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
        camera.position.set(0, 1, 2.5);
        
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enableZoom = true;
        controls.zoomSpeed = 1.2;
        controls.target.set(0, 0.5, 0);
        
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);
        
        const mainLight = new THREE.DirectionalLight(0xffffff, 1);
        mainLight.position.set(5, 10, 7);
        scene.add(mainLight);
        
        const fillLight = new THREE.DirectionalLight(0xffcc88, 0.5);
        fillLight.position.set(-3, 2, 4);
        scene.add(fillLight);
        
        const backLight = new THREE.DirectionalLight(0x88aaff, 0.4);
        backLight.position.set(0, 2, -5);
        scene.add(backLight);
        
        const loader = new GLTFLoader();
        
        function normalizeModel(model) {
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            
            model.position.x -= center.x;
            model.position.y -= center.y;
            model.position.z -= center.z;
            
            const maxDim = Math.max(size.x, size.y, size.z);
            if (maxDim > 0) {
                const scale = 1.2 / maxDim;
                model.scale.multiplyScalar(scale);
            }
        }
        
        console.log('Загружаю модель:', modelPath);
        
        loader.load(modelPath, (gltf) => {
            const model = gltf.scene;
            normalizeModel(model);
            scene.add(model);
            
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            controls.target.copy(center);
            camera.position.set(center.x, center.y + 0.5, center.z + 2.5);
            controls.update();
            
            renderer.render(scene, camera);
            console.log('Модель загружена');
        }, undefined, (error) => {
            console.error('Ошибка загрузки модели:', error);
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.fillStyle = "#2a2a2a";
                ctx.fillRect(0, 0, 400, 400);
                ctx.fillStyle = "#ffffff";
                ctx.font = "16px Arial";
                ctx.textAlign = "center";
                ctx.fillText("Модель не загрузилась: " + modelPath, 200, 200);
            }
        });
        
        document.getElementById('zoom-in').onclick = () => {
            const vec = new THREE.Vector3().subVectors(camera.position, controls.target).normalize();
            camera.position.addScaledVector(vec, -0.3);
            controls.update();
        };
        document.getElementById('zoom-out').onclick = () => {
            const vec = new THREE.Vector3().subVectors(camera.position, controls.target).normalize();
            camera.position.addScaledVector(vec, 0.3);
            controls.update();
        };
        
        function setCameraDirection(x, z) {
            const target = controls.target;
            camera.position.set(target.x + x, target.y + 0.5, target.z + z);
            controls.update();
        }
        
        document.getElementById('view-front').onclick = () => setCameraDirection(0, 2.5);
        document.getElementById('view-back').onclick = () => setCameraDirection(0, -2.5);
        document.getElementById('view-left').onclick = () => setCameraDirection(-2.5, 0);
        document.getElementById('view-right').onclick = () => setCameraDirection(2.5, 0);
        
        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }
        animate();
    }
}