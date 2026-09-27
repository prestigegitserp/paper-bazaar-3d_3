import { Canvas } from '@react-three/fiber'
import { OrbitControls, ContactShadows, RoundedBox } from '@react-three/drei'
import { useState } from 'react'
function Collection({ kind, color }: {kind: string; color: string}) {
  return <group rotation={[0, -.35, 0]}>
    <mesh position={[0,-.16,0]} receiveShadow><cylinderGeometry args={[2.1,2.2,.28,64]}/><meshStandardMaterial color="#dbd5c9" roughness={.85}/></mesh>
    {kind === 'board' ? [0,1,2].map(i => <RoundedBox key={i} args={[1.7-i*.2,.48,1.25-i*.1]} position={[i*.1,.25+i*.49,0]} radius={.025} smoothness={2}><meshStandardMaterial color={i===1 ? color : '#b18a58'} roughness={.95}/></RoundedBox>) : [0,1,2,3,4,5].map(i => <RoundedBox key={i} args={[1.7,.16,1.18]} position={[Math.sin(i)*.08,.13+i*.17,0]} rotation={[0,i*.025,0]} radius={.018} smoothness={2}><meshStandardMaterial color={i===3 ? color : '#f5f0de'} roughness={.85}/></RoundedBox>)}
    <mesh position={[1.1,.75,.6]}><cylinderGeometry args={[.34,.34,1.5,40]}/><meshStandardMaterial color="#ede3cf" roughness={.9}/></mesh>
    <mesh position={[1.1,1.507,.6]} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[.08,.31,40]}/><meshStandardMaterial color="#bcac90"/></mesh>
    <mesh position={[1.1,1.509,.6]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[.075,32]}/><meshBasicMaterial color="#5b5040"/></mesh>
  </group>
}
export default function Showroom({kind}: {kind: string}) {
  const [color,setColor] = useState('#287363')
  const [quality,setQuality] = useState(false)
  return <><div className="studio-canvas"><Canvas frameloop="demand" dpr={quality ? [1,1.5] : [1,1]} camera={{position:[3.5,2.8,4],fov:42}} gl={{antialias: true, powerPreference:'low-power'}} fallback={<p>نمای سه‌بعدی روی این دستگاه پشتیبانی نمی‌شود.</p>}><color attach="background" args={['#eeeae2']}/><ambientLight intensity={1.8}/><directionalLight position={[3,6,2]} intensity={3}/><directionalLight position={[-3,2,-2]} intensity={1.1} color="#c3ddd2"/><Collection kind={kind} color={color}/>{quality && <ContactShadows position={[0,-.31,0]} opacity={.35} scale={10} blur={2.5} far={5} frames={1}/>}<OrbitControls makeDefault minDistance={3} maxDistance={8} maxPolarAngle={Math.PI/2.1} target={[0,.5,0]} enablePan={false}/></Canvas></div><div className="studio-tools"><span>با کشیدن بچرخانید · با اسکرول بزرگ‌نمایی کنید</span><div>{['#287363','#c18b48','#353c4a'].map(c=><button key={c} className="swatch" aria-label={`رنگ ${c}`} aria-pressed={c===color} style={{background:c}} onClick={()=>setColor(c)}/>)}</div><button onClick={()=>setQuality(!quality)}>{quality ? 'کیفیت سینمایی' : 'حالت کم‌مصرف'}</button></div><p className="muted">مدل مفهومی متریال؛ تصویر یا ابعاد واقعی محصول فروشنده نیست.</p></>
}
