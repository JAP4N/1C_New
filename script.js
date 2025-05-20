document.addEventListener('DOMContentLoaded', function () {
        // Кнопки открытия
        const loginBtn = document.querySelector('.header__btn-login');
        const registerBtn = document.querySelector('.header__btn-register');

        // Формы
        const loginForm = document.querySelector('.login-form');
        const registerForm = document.querySelector('.register-form');

        // Обертка main (размывать будем main, header, footer)
        const main = document.querySelector('main');
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');

        // Создаем затемнение и крестик
        let overlay = document.createElement('div');
        overlay.className = 'modal__overlay';
        overlay.style.cssText = `
        position: fixed; inset: 0; background: rgba(0,0,0,0.3); z-index: 999;
        backdrop-filter: blur(5px); transition: opacity 0.3s;
    `;
        let closeBtnTemplate = document.createElement('button');
        closeBtnTemplate.className = 'modal__close';
        closeBtnTemplate.innerHTML = '&times;';
        closeBtnTemplate.setAttribute('aria-label', 'Закрыть');
        closeBtnTemplate.setAttribute('type', 'button');
        closeBtnTemplate.style.cssText = `
    position: absolute; top: 10px; right: 15px; background: none; border: none;
    font-size: 2rem; color: #e31e24; cursor: pointer; z-index: 1001;
`;

        // Стили для форм
        [loginForm, registerForm].forEach(form => {
            form.style.position = 'fixed';
            form.style.zIndex = '1000';
            form.style.left = '50%';
            form.style.top = '50%';
            form.style.transform = 'translate(-50%, -50%)';
            form.style.display = 'none';

            // Добавляем крестик внутрь формы
            const closeBtn = closeBtnTemplate.cloneNode(true);
            form.appendChild(closeBtn);

            // Событие для закрытия формы через крестик
            closeBtn.addEventListener('click', closeModal);
        });

        function openModal(form) {
            document.body.appendChild(overlay);
            form.style.display = 'flex';
            main && (main.style.filter = 'blur(5px)');
            header && (header.style.filter = 'blur(5px)');
            footer && (footer.style.filter = 'blur(5px)');
        }

        function closeModal() {
            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            [loginForm, registerForm].forEach(form => form.style.display = 'none');
            main && (main.style.filter = '');
            header && (header.style.filter = '');
            footer && (footer.style.filter = '');
        }

        // События для открытия форм
        loginBtn.addEventListener('click', function (e) {
            e.preventDefault();
            openModal(loginForm);
        });

        registerBtn.addEventListener('click', function (e) {
            e.preventDefault();
            openModal(registerForm);
        });

        // Закрытие по клику на overlay
        overlay.addEventListener('click', closeModal);

        // Закрытие по клавише ESC
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && (loginForm.style.display === 'flex' || registerForm.style.display === 'flex')) {
                closeModal();
            }
        });
    });