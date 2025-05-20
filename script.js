document.addEventListener('DOMContentLoaded', function () {
        // Кнопка открытия
        const openBtn = document.querySelector('.header__btn_tel');
        // Форма авторизации
        const loginForm = document.querySelector('.login-form');
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
        let closeBtn = document.createElement('button');
        closeBtn.className = 'modal__close';
        closeBtn.innerHTML = '&times;';
        closeBtn.setAttribute('aria-label', 'Закрыть');
        closeBtn.setAttribute('type', 'button'); // Добавлено, чтобы предотвратить отправку формы
        closeBtn.style.cssText = `
    position: absolute; top: 10px; right: 15px; background: none; border: none;
    font-size: 2rem; color: #e31e24; cursor: pointer; z-index: 1001;
`;

        // Стили для формы (чтобы была поверх overlay)
        loginForm.style.position = 'fixed';
        loginForm.style.zIndex = '1000';
        loginForm.style.left = '50%';
        loginForm.style.top = '50%';
        loginForm.style.transform = 'translate(-50%, -50%)';
        loginForm.style.display = 'none';

        // Добавляем крестик внутрь формы
        loginForm.appendChild(closeBtn);

        function openModal() {
            document.body.appendChild(overlay);
            loginForm.style.display = 'flex';
            main && (main.style.filter = 'blur(5px)');
            header && (header.style.filter = 'blur(5px)');
            footer && (footer.style.filter = 'blur(5px)');
        }
        function closeModal() {
            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            loginForm.style.display = 'none';
            main && (main.style.filter = '');
            header && (header.style.filter = '');
            footer && (footer.style.filter = '');
        }

        openBtn.addEventListener('click', function (e) {
            e.preventDefault();
            openModal();
        });
        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);

        // ESC для закрытия
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && loginForm.style.display === 'flex') {
                closeModal();
            }
        });
    });