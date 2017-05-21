import React from 'react';

export const renderField = ({input , label, type , unit,  meta: {touched ,error, warning}}) => (
    <div className='form-group'>
        <label className='control-label'>{label}</label>
        <div > 
            <div className="input-group">
                <input className='form-control' {...input} placeholder={label} type={type} title={label} />
                <span className="input-group-addon">{unit}</span>
            </div>
            {touched && 
            ((error && <p className='bg-warning' ><span>{error}</span></p>) || 
                (warning && <p className='bg-info'><span >{warning}</span></p>)    
                )}
        </div>
    </div>
)