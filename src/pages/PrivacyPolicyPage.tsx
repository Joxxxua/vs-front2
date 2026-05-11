import { Link } from 'react-router-dom'
import './PrivacyPolicyPage.css'

export default function PrivacyPolicyPage() {
  return (
    <main className="privacy-page">
      <section className="privacy-card">
        <p className="privacy-chip">Privacidade e Segurança</p>
        <h1>Política de Privacidade</h1>
        <p>
          Esta plataforma é destinada ao uso administrativo da clínica e trata dados sensíveis com
          confidencialidade, criptografia e controle de acesso por sessão autenticada.
        </p>
        <p>
          Os dados exibidos no painel são processados exclusivamente para operação de agendamentos
          e comunicação clínica, em conformidade com a legislação vigente e boas práticas de
          proteção de dados.
        </p>
        <p>
          Em caso de dúvidas sobre o tratamento de dados, entre em contato com o responsável pela
          segurança da informação da sua clínica.
        </p>

        <div className="privacy-actions">
          <Link to="/login">Voltar para login</Link>
        </div>
      </section>
    </main>
  )
}
