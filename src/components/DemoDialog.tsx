import { useEffect, useRef, useState, type FormEvent } from 'react'
import Icon from './Icon'
import type { Garden, MeasurementVariable } from '../types'

export type DialogMode = 'measurement' | 'observation'

export default function DemoDialog({ mode, garden, onSave, onDismiss }: {
  mode: DialogMode
  garden: Garden
  onSave: (value: { variable?: MeasurementVariable; reading?: number; observation?: string }) => void
  onDismiss: () => void
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [variable, setVariable] = useState<MeasurementVariable>('Humedad del suelo')
  const title = mode === 'measurement' ? 'Añadir lectura de ejemplo' : 'Registrar observación'

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog && !dialog.open) dialog.showModal()
  }, [])

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    if (mode === 'measurement') {
      const value = Number(form.get('reading'))
      if (!Number.isFinite(value) || value < 0 || (variable === 'Humedad del suelo' && value > 100)) return
      onSave({ variable, reading: value })
    } else {
      const observation = String(form.get('observation') ?? '').trim()
      if (observation.length < 8) return
      onSave({ observation })
    }
    dialogRef.current?.close()
  }

  return (
    <dialog className="action-dialog" ref={dialogRef} aria-labelledby="dialog-title" onClose={onDismiss} onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close() }}>
      <div className="dialog-heading"><div><p className="eyebrow">Huerta seleccionada</p><h2 id="dialog-title">{title}</h2><p>{garden.name}</p></div><button className="icon-button" type="button" aria-label="Cerrar formulario" onClick={() => dialogRef.current?.close()}><Icon name="close" /></button></div>
      <form onSubmit={submit}>
        {mode === 'measurement' ? <div className="form-field"><label htmlFor="reading-variable">Variable de ejemplo</label><select id="reading-variable" value={variable} onChange={(event) => setVariable(event.target.value as MeasurementVariable)}><option>Humedad del suelo</option><option>Temperatura ambiente</option></select><small>La lectura se guardará como dato simulado, sin conexión a sensores.</small><label htmlFor="reading-value">Valor</label><div className="input-with-unit"><input id="reading-value" name="reading" type="number" min="0" max={variable === 'Humedad del suelo' ? 100 : undefined} step="0.1" required autoFocus /><span>{variable === 'Humedad del suelo' ? '%' : '°C'}</span></div></div> : <div className="form-field"><label htmlFor="observation-text">Observación</label><textarea id="observation-text" name="observation" rows={5} minLength={8} maxLength={240} placeholder="Escribí una nota de seguimiento de ejemplo…" required autoFocus /><small>Entre 8 y 240 caracteres. No incluyas datos personales.</small></div>}
        <div className="dialog-actions"><button className="button-quiet" type="button" onClick={() => dialogRef.current?.close()}>Cancelar</button><button className="button-primary button-small" type="submit">{mode === 'measurement' ? 'Guardar lectura' : 'Guardar observación'}</button></div>
      </form>
    </dialog>
  )
}
