import {cloneTemplate} from "../lib/utils.js";

/**
 * Инициализирует таблицу и вызывает коллбэк при любых изменениях и нажатиях на кнопки
 *
 * @param {Object} settings
 * @param {(action: HTMLButtonElement | undefined) => void} onAction
 * @returns {{container: Node, elements: *, render: render}}
 */
export function initTable(settings, onAction) {
    const {tableTemplate, rowTemplate, before, after} = settings;
    const root = cloneTemplate(tableTemplate);

    // @todo: #1.2 —  вывести дополнительные шаблоны до и после таблицы - сделано

    before.reverse().forEach((subName) => {
        root[subName] = cloneTemplate(subName);
        root.container.prepend(root[subName].container);
    });

    after.forEach((subName) => {
        root[subName] = cloneTemplate(subName);
        root.container.append(root[subName].container);
    });


    // @todo: #1.3 —  обработать события и вызвать onAction() - сделано
    root.container.addEventListener('change', () => onAction());

    root.container.addEventListener('reset', () => {
        setTimeout(onAction);
    });

    root.container.addEventListener('submit', (e) => {
        e.preventDefault();
        onAction(e.submitter);
    });


    const render = (data) => {
        // @todo: #1.1 — преобразовать данные в массив строк на основе шаблона rowTemplate - сделано

        // const nextRows = []; так было раньше
        const nextRows = data.map((item) => {
            const row = cloneTemplate(rowTemplate);

            // Перебираем все ключи объекта данных: date, customer, seller, total, id и т.д.
            Object.keys(item).forEach((key) => {
                // Проверяем: есть ли в шаблоне элемент с таким именем (data-name=key)
                if (key in row.elements) {
                    // Если есть — вставляем значение в текст ячейки
                    row.elements[key].textContent = item[key] ?? '';
                }
            });

            return row.container;
        });

        
        root.elements.rows.replaceChildren(...nextRows);
    }

    return {...root, render};
}