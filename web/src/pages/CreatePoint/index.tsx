import React from 'react';
import { Link } from 'react-router-dom'
import { FiArrowDownLeft } from 'react-icons/fi'

import './styles.css'

import logo from '../../assets/logo.svg'

const CreatePoint = () => {
    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta" />

                <Link to="/">
                    <span>
                        <FiArrowDownLeft />
                    </span>
                    Voltar para a home
                </Link>
            </header>

            <form>
                <h1>Cadastro do <br/> ponto de coleta  1:02:46</h1>
            </form>
        </div>
    )
}

export default CreatePoint;