import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Icon from '../components/Icon'

const steps = [
  { number: '01', title: 'Recopilar', text: 'Reunir mediciones de ejemplo vinculadas a cada huerta.' },
  { number: '02', title: 'Guardar', text: 'Conservar lecturas y observaciones en un historial.' },
  { number: '03', title: 'Consultar', text: 'Explorar fechas, variables y cambios registrados.' },
  { number: '04', title: 'Estudiar', text: 'Aportar información organizada al trabajo con especialistas.' },
]

function GardenArtwork() {
  return (
    <div className="hero-art" aria-label="Ilustración conceptual de canteros junto a un panel de seguimiento">
      <div className="art-sun" />
      <div className="art-field">
        <svg viewBox="0 0 520 400" role="img" aria-label="Ilustración conceptual de una huerta con canteros y cultivos">
          <path d="M0 245C92 201 155 226 238 183s157-41 282-7v224H0Z" fill="#e8eee1" />
          <path d="M0 279c78-25 151-6 236-43 83-36 184-44 284-15v179H0Z" fill="#dbe8d4" />
          <path d="M36 310c91-39 165-10 260-48 74-30 132-37 195-29" fill="none" stroke="#a7c390" strokeWidth="3" />
          <path d="M25 350c85-32 164-9 259-45 72-28 146-39 210-28" fill="none" stroke="#a7c390" strokeWidth="3" />
          <g fill="#4b8c58">
            <path d="M80 245c-3-30 10-50 23-53 8 19 1 40-23 53Zm5 1c-19-22-20-43-11-51 16 13 21 29 11 51Zm40-17c-1-31 13-52 26-54 8 20-1 42-26 54Zm7 1c-18-23-17-43-7-51 16 12 19 29 7 51Zm54-26c0-28 14-47 26-49 7 18-2 38-26 49Zm8 2c-17-21-17-39-7-47 15 11 18 26 7 47Z" />
            <path d="M275 252c-2-30 11-48 24-51 8 19 1 39-24 51Zm6 2c-18-21-19-41-10-49 15 12 20 27 10 49Zm50-17c0-29 13-48 25-51 8 18 0 39-25 51Zm7 1c-17-21-17-40-7-48 15 12 18 27 7 48Zm55-23c0-27 13-45 25-47 7 17-2 36-25 47Zm8 2c-16-20-16-38-7-45 14 10 17 25 7 45Z" />
          </g>
          <g fill="none" stroke="#286c47" strokeWidth="3" strokeLinecap="round">
            <path d="M97 268v-34m41 16v-35m58 15v-32m92 55v-33m50 17v-35m58 13v-32" />
          </g>
          <g fill="#db8b48"><circle cx="126" cy="213" r="5" /><circle cx="331" cy="224" r="5" /><circle cx="256" cy="269" r="4" /></g>
        </svg>
        <div className="art-label"><span className="art-label-dot" /> Vista conceptual · huerta de estudio</div>
      </div>
      <div className="preview-card preview-main">
        <div className="preview-top"><span>Seguimiento</span><span className="preview-tag">EJEMPLO</span></div>
        <strong>Huerta de estudio Norte</strong>
        <small>Monte Caseros · Corrientes</small>
        <div className="preview-chart" aria-hidden="true"><i /><i /><i /><i /><i /><svg viewBox="0 0 180 38"><path d="M0 31 37 23 71 25 109 13 145 18 180 5" fill="none" stroke="#287a70" strokeWidth="2.5" /></svg></div>
        <div className="preview-bottom"><span>Humedad del suelo</span><b>36,5 %</b></div>
      </div>
      <div className="preview-card preview-note"><span className="preview-note-icon"><Icon name="leaf" /></span><span><b>Registros en contexto</b><small>Mediciones y observaciones</small></span></div>
    </div>
  )
}

export default function HomePage() {
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const section = searchParams.get('section')
    if (!section) return
    window.requestAnimationFrame(() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }, [searchParams])

  return (
    <>
      <section className="home-hero">
        <div className="public-container hero-layout">
          <div className="hero-copy">
            <p className="kicker"><span /> AGRONAUTAS <span className="kicker-separator">/</span> JAKARU PORÁ</p>
            <h1>Información para acompañar la evolución de cada huerta</h1>
            <p className="hero-lead">Una propuesta de Agronautas para registrar condiciones, estudiar su evolución y facilitar el seguimiento de las huertas de Jakaru Porá.</p>
            <div className="hero-actions"><Link className="button-primary" to="/demo">Explorar la demo <Icon name="arrow" /></Link><Link className="button-text" to="/?section=etapas">Conocer las etapas <span aria-hidden="true">↓</span></Link></div>
            <div className="hero-caption"><span className="caption-rule" /> Una primera etapa centrada en huertas de estudio</div>
          </div>
          <GardenArtwork />
        </div>
        <div className="public-container hero-foot"><span>Una herramienta en desarrollo</span><span>Demo con datos simulados</span></div>
      </section>

      <section className="section-how" id="propuesta">
        <div className="public-container">
          <div className="section-heading section-heading-split">
            <div><p className="kicker">CÓMO FUNCIONARÍA</p><h2>De una lectura a una historia que se puede consultar</h2></div>
            <p>La propuesta conecta mediciones, registros y consultas para acompañar el estudio de cada huerta junto con especialistas.</p>
          </div>
          <div className="steps-grid">{steps.map((step) => <article className="step-item" key={step.number}><span className="step-number">{step.number}</span><div className="step-icon"><Icon name={step.number === '01' ? 'drop' : step.number === '02' ? 'history' : step.number === '03' ? 'overview' : 'study'} /></div><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
        </div>
      </section>

      <section className="section-stages" id="etapas">
        <div className="public-container stages-layout">
          <div className="stages-intro"><p className="kicker">ETAPAS DEL DESARROLLO</p><h2>Aprender primero. Ampliar después.</h2><p>Un desarrollo progresivo para estudiar la experiencia y evaluar cómo extenderla.</p></div>
          <div className="stage-list">
            <article className="stage-item"><span className="stage-marker">01</span><div><span className="stage-label">PRIMERO</span><h3>Huertas de estudio</h3><p>Validar el registro y la consulta de mediciones junto con el trabajo de especialistas.</p></div><span className="stage-status">Etapa inicial</span></article>
            <article className="stage-item"><span className="stage-marker stage-marker-muted">02</span><div><span className="stage-label">DESPUÉS</span><h3>Ampliar el seguimiento</h3><p>Evaluar dispositivos más accesibles para huertas familiares y comunitarias.</p></div><span className="stage-status stage-status-muted">Proyección</span></article>
          </div>
        </div>
      </section>

      <section className="section-benefits">
        <div className="public-container">
          <div className="section-heading"><p className="kicker">QUÉ BUSCAMOS ACOMPAÑAR</p><h2>Información útil para distintos recorridos</h2><p>Son objetivos del proyecto, sujetos al desarrollo y al trabajo conjunto.</p></div>
          <div className="benefit-grid">
            <article><span className="benefit-index">01 / FAMILIAS</span><h3>Acompañar decisiones</h3><p>Contar con registros que puedan aportar información para el seguimiento de los cultivos.</p></article>
            <article><span className="benefit-index">02 / ESPECIALISTAS</span><h3>Estudiar y comparar</h3><p>Organizar observaciones y mediciones como insumo para el análisis especializado.</p></article>
            <article><span className="benefit-index">03 / ORGANISMOS</span><h3>Consultar avances</h3><p>Explorar herramientas para acompañar el desarrollo del programa de huertas.</p></article>
          </div>
        </div>
      </section>

      <section className="section-team">
        <div className="public-container team-panel"><div className="team-symbol"><Icon name="leaf" /></div><div><p className="kicker">SOBRE AGRONAUTAS</p><h2>Software y hardware para el ámbito agropecuario</h2><p>Somos parte de un equipo de cerca de ocho emprendedores. Agronautas trabaja en proyectos agropecuarios, incluido el monitoreo de ganado, y desarrolla esta propuesta junto con Jakaru Porá.</p></div><Link className="button-primary button-light" to="/demo">Ver la propuesta en demo <Icon name="arrow" /></Link></div>
      </section>
    </>
  )
}
