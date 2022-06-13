import React from 'react';

function EntranceForm({name, title, children, onSubmit}) {
    return (
        <div className="popup__container popup__container_for_entrance">
            <h2 className={`popup__title popup__title_for_entrance popup__title_for${name}`}>{title}</h2>
            <form className={`popup__form popup__form_for_${name}`} name={name} onSubmit={onSubmit}>
                {children}
            </form>
        </div>
    )
}

export default EntranceForm;