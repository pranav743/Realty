import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Cube(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('models/magic_cube_ii.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={1.117}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Cube002_1" position={[0.95, 1, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh name="Object_6" geometry={nodes.Object_6.geometry} material={materials.material_1} />
              </group>
              <group name="Cube001_2" position={[0.85, 1, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh name="Object_8" geometry={nodes.Object_8.geometry} material={materials.material_1} />
              </group>
              <group name="Cube003_3" position={[0.75, 1, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh name="Object_10" geometry={nodes.Object_10.geometry} material={materials.material_1} />
              </group>
              <group name="Cube004_4" position={[0.65, 1, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh name="Object_12" geometry={nodes.Object_12.geometry} material={materials.material_1} />
              </group>
              <group name="Cube005_5" position={[0.55, 1, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh name="Object_14" geometry={nodes.Object_14.geometry} material={materials.material_1} />
              </group>
              <group name="Cube006_6" position={[0.45, 1, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh name="Object_16" geometry={nodes.Object_16.geometry} material={materials.material_1} />
              </group>
              <group name="Cube007_7" position={[0.35, 1, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh name="Object_18" geometry={nodes.Object_18.geometry} material={materials.material_1} />
              </group>
              <group name="Cube008_8" position={[0.25, 1, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh name="Object_20" geometry={nodes.Object_20.geometry} material={materials.material_1} />
              </group>
              <group name="Cube010_9" position={[0.15, 1, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh name="Object_22" geometry={nodes.Object_22.geometry} material={materials.material_1} />
              </group>
              <group name="Cube009_10" position={[0.05, 1, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh name="Object_24" geometry={nodes.Object_24.geometry} material={materials.material_1} />
              </group>
              <group name="Cube011_11" position={[-0.05, 1, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh name="Object_26" geometry={nodes.Object_26.geometry} material={materials.material_1} />
              </group>
              <group name="Cube012_12" position={[-0.15, 1, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh name="Object_28" geometry={nodes.Object_28.geometry} material={materials.material_1} />
              </group>
              <group name="Cube013_13" position={[-0.25, 1, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh name="Object_30" geometry={nodes.Object_30.geometry} material={materials.material_1} />
              </group>
              <group name="Cube014_14" position={[-0.35, 1, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh name="Object_32" geometry={nodes.Object_32.geometry} material={materials.material_1} />
              </group>
              <group name="Cube015_15" position={[-0.45, 1, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh name="Object_34" geometry={nodes.Object_34.geometry} material={materials.material_1} />
              </group>
              <group name="Cube016_16" position={[-0.55, 1, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh name="Object_36" geometry={nodes.Object_36.geometry} material={materials.material_1} />
              </group>
              <group name="Cube017_17" position={[-0.65, 1, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh name="Object_38" geometry={nodes.Object_38.geometry} material={materials.material_1} />
              </group>
              <group name="Cube018_18" position={[-0.75, 1, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh name="Object_40" geometry={nodes.Object_40.geometry} material={materials.material_1} />
              </group>
              <group name="Cube019_19" position={[-0.85, 1, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh name="Object_42" geometry={nodes.Object_42.geometry} material={materials.material_1} />
              </group>
              <group name="Cube020_20" position={[-0.95, 1, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh name="Object_44" geometry={nodes.Object_44.geometry} material={materials.material_1} />
              </group>
              <group name="Cube041_21" position={[-0.95, -1, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh name="Object_46" geometry={nodes.Object_46.geometry} material={materials.material_2} />
              </group>
              <group name="Cube042_22" position={[-0.85, -1, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh name="Object_48" geometry={nodes.Object_48.geometry} material={materials.material_2} />
              </group>
              <group name="Cube043_23" position={[-0.75, -1, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh name="Object_50" geometry={nodes.Object_50.geometry} material={materials.material_2} />
              </group>
              <group name="Cube044_24" position={[-0.65, -1, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh name="Object_52" geometry={nodes.Object_52.geometry} material={materials.material_2} />
              </group>
              <group name="Cube045_25" position={[-0.55, -1, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh name="Object_54" geometry={nodes.Object_54.geometry} material={materials.material_2} />
              </group>
              <group name="Cube046_26" position={[-0.45, -1, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh name="Object_56" geometry={nodes.Object_56.geometry} material={materials.material_2} />
              </group>
              <group name="Cube047_27" position={[-0.35, -1, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh name="Object_58" geometry={nodes.Object_58.geometry} material={materials.material_2} />
              </group>
              <group name="Cube048_28" position={[-0.25, -1, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh name="Object_60" geometry={nodes.Object_60.geometry} material={materials.material_2} />
              </group>
              <group name="Cube049_29" position={[-0.15, -1, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh name="Object_62" geometry={nodes.Object_62.geometry} material={materials.material_2} />
              </group>
              <group name="Cube050_30" position={[-0.05, -1, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh name="Object_64" geometry={nodes.Object_64.geometry} material={materials.material_2} />
              </group>
              <group name="Cube051_31" position={[0.05, -1, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh name="Object_66" geometry={nodes.Object_66.geometry} material={materials.material_2} />
              </group>
              <group name="Cube052_32" position={[0.15, -1, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh name="Object_68" geometry={nodes.Object_68.geometry} material={materials.material_2} />
              </group>
              <group name="Cube053_33" position={[0.25, -1, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh name="Object_70" geometry={nodes.Object_70.geometry} material={materials.material_2} />
              </group>
              <group name="Cube054_34" position={[0.35, -1, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh name="Object_72" geometry={nodes.Object_72.geometry} material={materials.material_2} />
              </group>
              <group name="Cube055_35" position={[0.45, -1, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh name="Object_74" geometry={nodes.Object_74.geometry} material={materials.material_2} />
              </group>
              <group name="Cube056_36" position={[0.55, -1, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh name="Object_76" geometry={nodes.Object_76.geometry} material={materials.material_2} />
              </group>
              <group name="Cube057_37" position={[0.65, -1, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh name="Object_78" geometry={nodes.Object_78.geometry} material={materials.material_2} />
              </group>
              <group name="Cube058_38" position={[0.75, -1, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh name="Object_80" geometry={nodes.Object_80.geometry} material={materials.material_2} />
              </group>
              <group name="Cube059_39" position={[0.85, -1, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh name="Object_82" geometry={nodes.Object_82.geometry} material={materials.material_2} />
              </group>
              <group name="Cube060_40" position={[0.95, -1, 0]} rotation={[0, 0, Math.PI / 2]}>
                <mesh name="Object_84" geometry={nodes.Object_84.geometry} material={materials.material_2} />
              </group>
              <group name="Cube081_44" position={[-0.64, 0.608, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.64}>
                <mesh name="Object_87" geometry={nodes.Object_87.geometry} material={materials.material_1} />
              </group>
              <group name="Cube082_45" position={[-0.64, 0.544, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.64}>
                <mesh name="Object_89" geometry={nodes.Object_89.geometry} material={materials.material_1} />
              </group>
              <group name="Cube083_46" position={[-0.64, 0.48, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.64}>
                <mesh name="Object_91" geometry={nodes.Object_91.geometry} material={materials.material_1} />
              </group>
              <group name="Cube084_47" position={[-0.64, 0.416, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.64}>
                <mesh name="Object_93" geometry={nodes.Object_93.geometry} material={materials.material_1} />
              </group>
              <group name="Cube085_48" position={[-0.64, 0.352, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.64}>
                <mesh name="Object_95" geometry={nodes.Object_95.geometry} material={materials.material_1} />
              </group>
              <group name="Cube086_49" position={[-0.64, 0.288, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.64}>
                <mesh name="Object_97" geometry={nodes.Object_97.geometry} material={materials.material_1} />
              </group>
              <group name="Cube087_50" position={[-0.64, 0.224, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.64}>
                <mesh name="Object_99" geometry={nodes.Object_99.geometry} material={materials.material_1} />
              </group>
              <group name="Cube088_51" position={[-0.64, 0.16, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.64}>
                <mesh name="Object_101" geometry={nodes.Object_101.geometry} material={materials.material_1} />
              </group>
              <group name="Cube089_52" position={[-0.64, 0.096, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.64}>
                <mesh name="Object_103" geometry={nodes.Object_103.geometry} material={materials.material_1} />
              </group>
              <group name="Cube090_53" position={[-0.64, 0.032, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.64}>
                <mesh name="Object_105" geometry={nodes.Object_105.geometry} material={materials.material_1} />
              </group>
              <group name="Cube091_54" position={[-0.64, -0.032, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.64}>
                <mesh name="Object_107" geometry={nodes.Object_107.geometry} material={materials.material_1} />
              </group>
              <group name="Cube092_55" position={[-0.64, -0.096, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.64}>
                <mesh name="Object_109" geometry={nodes.Object_109.geometry} material={materials.material_1} />
              </group>
              <group name="Cube093_56" position={[-0.64, -0.16, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.64}>
                <mesh name="Object_111" geometry={nodes.Object_111.geometry} material={materials.material_1} />
              </group>
              <group name="Cube094_57" position={[-0.64, -0.224, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.64}>
                <mesh name="Object_113" geometry={nodes.Object_113.geometry} material={materials.material_1} />
              </group>
              <group name="Cube095_58" position={[-0.64, -0.288, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.64}>
                <mesh name="Object_115" geometry={nodes.Object_115.geometry} material={materials.material_1} />
              </group>
              <group name="Cube096_59" position={[-0.64, -0.352, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.64}>
                <mesh name="Object_117" geometry={nodes.Object_117.geometry} material={materials.material_1} />
              </group>
              <group name="Cube097_60" position={[-0.64, -0.416, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.64}>
                <mesh name="Object_119" geometry={nodes.Object_119.geometry} material={materials.material_1} />
              </group>
              <group name="Cube098_61" position={[-0.64, -0.48, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.64}>
                <mesh name="Object_121" geometry={nodes.Object_121.geometry} material={materials.material_1} />
              </group>
              <group name="Cube099_62" position={[-0.64, -0.544, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.64}>
                <mesh name="Object_123" geometry={nodes.Object_123.geometry} material={materials.material_1} />
              </group>
              <group name="Cube100_63" position={[-0.64, -0.608, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.64}>
                <mesh name="Object_125" geometry={nodes.Object_125.geometry} material={materials.material_1} />
              </group>
              <group name="Cube121_64" position={[0.64, -0.608, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.64}>
                <mesh name="Object_127" geometry={nodes.Object_127.geometry} material={materials.material_2} />
              </group>
              <group name="Cube122_65" position={[0.64, -0.544, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.64}>
                <mesh name="Object_129" geometry={nodes.Object_129.geometry} material={materials.material_2} />
              </group>
              <group name="Cube123_66" position={[0.64, -0.48, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.64}>
                <mesh name="Object_131" geometry={nodes.Object_131.geometry} material={materials.material_2} />
              </group>
              <group name="Cube124_67" position={[0.64, -0.416, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.64}>
                <mesh name="Object_133" geometry={nodes.Object_133.geometry} material={materials.material_2} />
              </group>
              <group name="Cube125_68" position={[0.64, -0.352, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.64}>
                <mesh name="Object_135" geometry={nodes.Object_135.geometry} material={materials.material_2} />
              </group>
              <group name="Cube126_69" position={[0.64, -0.288, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.64}>
                <mesh name="Object_137" geometry={nodes.Object_137.geometry} material={materials.material_2} />
              </group>
              <group name="Cube127_70" position={[0.64, -0.224, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.64}>
                <mesh name="Object_139" geometry={nodes.Object_139.geometry} material={materials.material_2} />
              </group>
              <group name="Cube128_71" position={[0.64, -0.16, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.64}>
                <mesh name="Object_141" geometry={nodes.Object_141.geometry} material={materials.material_2} />
              </group>
              <group name="Cube129_72" position={[0.64, -0.096, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.64}>
                <mesh name="Object_143" geometry={nodes.Object_143.geometry} material={materials.material_2} />
              </group>
              <group name="Cube130_73" position={[0.64, -0.032, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.64}>
                <mesh name="Object_145" geometry={nodes.Object_145.geometry} material={materials.material_2} />
              </group>
              <group name="Cube131_74" position={[0.64, 0.032, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.64}>
                <mesh name="Object_147" geometry={nodes.Object_147.geometry} material={materials.material_2} />
              </group>
              <group name="Cube132_75" position={[0.64, 0.096, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.64}>
                <mesh name="Object_149" geometry={nodes.Object_149.geometry} material={materials.material_2} />
              </group>
              <group name="Cube133_76" position={[0.64, 0.16, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.64}>
                <mesh name="Object_151" geometry={nodes.Object_151.geometry} material={materials.material_2} />
              </group>
              <group name="Cube134_77" position={[0.64, 0.224, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.64}>
                <mesh name="Object_153" geometry={nodes.Object_153.geometry} material={materials.material_2} />
              </group>
              <group name="Cube135_78" position={[0.64, 0.288, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.64}>
                <mesh name="Object_155" geometry={nodes.Object_155.geometry} material={materials.material_2} />
              </group>
              <group name="Cube136_79" position={[0.64, 0.352, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.64}>
                <mesh name="Object_157" geometry={nodes.Object_157.geometry} material={materials.material_2} />
              </group>
              <group name="Cube137_80" position={[0.64, 0.416, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.64}>
                <mesh name="Object_159" geometry={nodes.Object_159.geometry} material={materials.material_2} />
              </group>
              <group name="Cube138_81" position={[0.64, 0.48, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.64}>
                <mesh name="Object_161" geometry={nodes.Object_161.geometry} material={materials.material_2} />
              </group>
              <group name="Cube139_82" position={[0.64, 0.544, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.64}>
                <mesh name="Object_163" geometry={nodes.Object_163.geometry} material={materials.material_2} />
              </group>
              <group name="Cube140_83" position={[0.64, 0.608, 0]} rotation={[0, 0, Math.PI / 2]} scale={0.64}>
                <mesh name="Object_165" geometry={nodes.Object_165.geometry} material={materials.material_2} />
              </group>
              <group name="Circle007_84" rotation={[0, 0, -Math.PI]} scale={0.64} />
              <group name="Cube021_87" position={[0, 0.76, 0.8]} rotation={[0, 0, Math.PI / 2]} scale={0.8}>
                <mesh name="Object_168" geometry={nodes.Object_168.geometry} material={materials.material_1} />
              </group>
              <group name="Cube022_88" position={[0, 0.68, 0.8]} rotation={[0, 0, Math.PI / 2]} scale={0.8}>
                <mesh name="Object_170" geometry={nodes.Object_170.geometry} material={materials.material_1} />
              </group>
              <group name="Cube023_89" position={[0, 0.6, 0.8]} rotation={[0, 0, Math.PI / 2]} scale={0.8}>
                <mesh name="Object_172" geometry={nodes.Object_172.geometry} material={materials.material_1} />
              </group>
              <group name="Cube024_90" position={[0, 0.52, 0.8]} rotation={[0, 0, Math.PI / 2]} scale={0.8}>
                <mesh name="Object_174" geometry={nodes.Object_174.geometry} material={materials.material_1} />
              </group>
              <group name="Cube025_91" position={[0, 0.44, 0.8]} rotation={[0, 0, Math.PI / 2]} scale={0.8}>
                <mesh name="Object_176" geometry={nodes.Object_176.geometry} material={materials.material_1} />
              </group>
              <group name="Cube026_92" position={[0, 0.36, 0.8]} rotation={[0, 0, Math.PI / 2]} scale={0.8}>
                <mesh name="Object_178" geometry={nodes.Object_178.geometry} material={materials.material_1} />
              </group>
              <group name="Cube027_93" position={[0, 0.28, 0.8]} rotation={[0, 0, Math.PI / 2]} scale={0.8}>
                <mesh name="Object_180" geometry={nodes.Object_180.geometry} material={materials.material_1} />
              </group>
              <group name="Cube028_94" position={[0, 0.2, 0.8]} rotation={[0, 0, Math.PI / 2]} scale={0.8}>
                <mesh name="Object_182" geometry={nodes.Object_182.geometry} material={materials.material_1} />
              </group>
              <group name="Cube029_95" position={[0, 0.12, 0.8]} rotation={[0, 0, Math.PI / 2]} scale={0.8}>
                <mesh name="Object_184" geometry={nodes.Object_184.geometry} material={materials.material_1} />
              </group>
              <group name="Cube030_96" position={[0, 0.04, 0.8]} rotation={[0, 0, Math.PI / 2]} scale={0.8}>
                <mesh name="Object_186" geometry={nodes.Object_186.geometry} material={materials.material_1} />
              </group>
              <group name="Cube031_97" position={[0, -0.04, 0.8]} rotation={[0, 0, Math.PI / 2]} scale={0.8}>
                <mesh name="Object_188" geometry={nodes.Object_188.geometry} material={materials.material_1} />
              </group>
              <group name="Cube032_98" position={[0, -0.12, 0.8]} rotation={[0, 0, Math.PI / 2]} scale={0.8}>
                <mesh name="Object_190" geometry={nodes.Object_190.geometry} material={materials.material_1} />
              </group>
              <group name="Cube033_99" position={[0, -0.2, 0.8]} rotation={[0, 0, Math.PI / 2]} scale={0.8}>
                <mesh name="Object_192" geometry={nodes.Object_192.geometry} material={materials.material_1} />
              </group>
              <group name="Cube034_100" position={[0, -0.28, 0.8]} rotation={[0, 0, Math.PI / 2]} scale={0.8}>
                <mesh name="Object_194" geometry={nodes.Object_194.geometry} material={materials.material_1} />
              </group>
              <group name="Cube035_101" position={[0, -0.36, 0.8]} rotation={[0, 0, Math.PI / 2]} scale={0.8}>
                <mesh name="Object_196" geometry={nodes.Object_196.geometry} material={materials.material_1} />
              </group>
              <group name="Cube036_102" position={[0, -0.44, 0.8]} rotation={[0, 0, Math.PI / 2]} scale={0.8}>
                <mesh name="Object_198" geometry={nodes.Object_198.geometry} material={materials.material_1} />
              </group>
              <group name="Cube037_103" position={[0, -0.52, 0.8]} rotation={[0, 0, Math.PI / 2]} scale={0.8}>
                <mesh name="Object_200" geometry={nodes.Object_200.geometry} material={materials.material_1} />
              </group>
              <group name="Cube038_104" position={[0, -0.6, 0.8]} rotation={[0, 0, Math.PI / 2]} scale={0.8}>
                <mesh name="Object_202" geometry={nodes.Object_202.geometry} material={materials.material_1} />
              </group>
              <group name="Cube039_105" position={[0, -0.68, 0.8]} rotation={[0, 0, Math.PI / 2]} scale={0.8}>
                <mesh name="Object_204" geometry={nodes.Object_204.geometry} material={materials.material_1} />
              </group>
              <group name="Cube040_106" position={[0, -0.76, 0.8]} rotation={[0, 0, Math.PI / 2]} scale={0.8}>
                <mesh name="Object_206" geometry={nodes.Object_206.geometry} material={materials.material_1} />
              </group>
              <group name="Cube061_107" position={[0, -0.76, -0.8]} rotation={[0, 0, Math.PI / 2]} scale={0.8}>
                <mesh name="Object_208" geometry={nodes.Object_208.geometry} material={materials.material_2} />
              </group>
              <group name="Cube062_108" position={[0, -0.68, -0.8]} rotation={[0, 0, Math.PI / 2]} scale={0.8}>
                <mesh name="Object_210" geometry={nodes.Object_210.geometry} material={materials.material_2} />
              </group>
              <group name="Cube063_109" position={[0, -0.6, -0.8]} rotation={[0, 0, Math.PI / 2]} scale={0.8}>
                <mesh name="Object_212" geometry={nodes.Object_212.geometry} material={materials.material_2} />
              </group>
              <group name="Cube064_110" position={[0, -0.52, -0.8]} rotation={[0, 0, Math.PI / 2]} scale={0.8}>
                <mesh name="Object_214" geometry={nodes.Object_214.geometry} material={materials.material_2} />
              </group>
              <group name="Cube065_111" position={[0, -0.44, -0.8]} rotation={[0, 0, Math.PI / 2]} scale={0.8}>
                <mesh name="Object_216" geometry={nodes.Object_216.geometry} material={materials.material_2} />
              </group>
              <group name="Cube066_112" position={[0, -0.36, -0.8]} rotation={[0, 0, Math.PI / 2]} scale={0.8}>
                <mesh name="Object_218" geometry={nodes.Object_218.geometry} material={materials.material_2} />
              </group>
              <group name="Cube067_113" position={[0, -0.28, -0.8]} rotation={[0, 0, Math.PI / 2]} scale={0.8}>
                <mesh name="Object_220" geometry={nodes.Object_220.geometry} material={materials.material_2} />
              </group>
              <group name="Cube068_114" position={[0, -0.2, -0.8]} rotation={[0, 0, Math.PI / 2]} scale={0.8}>
                <mesh name="Object_222" geometry={nodes.Object_222.geometry} material={materials.material_2} />
              </group>
              <group name="Cube069_115" position={[0, -0.12, -0.8]} rotation={[0, 0, Math.PI / 2]} scale={0.8}>
                <mesh name="Object_224" geometry={nodes.Object_224.geometry} material={materials.material_2} />
              </group>
              <group name="Cube070_116" position={[0, -0.04, -0.8]} rotation={[0, 0, Math.PI / 2]} scale={0.8}>
                <mesh name="Object_226" geometry={nodes.Object_226.geometry} material={materials.material_2} />
              </group>
              <group name="Cube071_117" position={[0, 0.04, -0.8]} rotation={[0, 0, Math.PI / 2]} scale={0.8}>
                <mesh name="Object_228" geometry={nodes.Object_228.geometry} material={materials.material_2} />
              </group>
              <group name="Cube072_118" position={[0, 0.12, -0.8]} rotation={[0, 0, Math.PI / 2]} scale={0.8}>
                <mesh name="Object_230" geometry={nodes.Object_230.geometry} material={materials.material_2} />
              </group>
              <group name="Cube073_119" position={[0, 0.2, -0.8]} rotation={[0, 0, Math.PI / 2]} scale={0.8}>
                <mesh name="Object_232" geometry={nodes.Object_232.geometry} material={materials.material_2} />
              </group>
              <group name="Cube074_120" position={[0, 0.28, -0.8]} rotation={[0, 0, Math.PI / 2]} scale={0.8}>
                <mesh name="Object_234" geometry={nodes.Object_234.geometry} material={materials.material_2} />
              </group>
              <group name="Cube075_121" position={[0, 0.36, -0.8]} rotation={[0, 0, Math.PI / 2]} scale={0.8}>
                <mesh name="Object_236" geometry={nodes.Object_236.geometry} material={materials.material_2} />
              </group>
              <group name="Cube076_122" position={[0, 0.44, -0.8]} rotation={[0, 0, Math.PI / 2]} scale={0.8}>
                <mesh name="Object_238" geometry={nodes.Object_238.geometry} material={materials.material_2} />
              </group>
              <group name="Cube077_123" position={[0, 0.52, -0.8]} rotation={[0, 0, Math.PI / 2]} scale={0.8}>
                <mesh name="Object_240" geometry={nodes.Object_240.geometry} material={materials.material_2} />
              </group>
              <group name="Cube078_124" position={[0, 0.6, -0.8]} rotation={[0, 0, Math.PI / 2]} scale={0.8}>
                <mesh name="Object_242" geometry={nodes.Object_242.geometry} material={materials.material_2} />
              </group>
              <group name="Cube079_125" position={[0, 0.68, -0.8]} rotation={[0, 0, Math.PI / 2]} scale={0.8}>
                <mesh name="Object_244" geometry={nodes.Object_244.geometry} material={materials.material_2} />
              </group>
              <group name="Cube080_126" position={[0, 0.76, -0.8]} rotation={[0, 0, Math.PI / 2]} scale={0.8}>
                <mesh name="Object_246" geometry={nodes.Object_246.geometry} material={materials.material_2} />
              </group>
              <group name="Circle003_127" rotation={[0, 0, -Math.PI]} scale={0.8} />
              <group name="Cube101_130" position={[0, 0.512, 0.486]} rotation={[0, 0, Math.PI / 2]} scale={0.512}>
                <mesh name="Object_249" geometry={nodes.Object_249.geometry} material={materials.material_1} />
              </group>
              <group name="Cube102_131" position={[0, 0.512, 0.435]} rotation={[0, 0, Math.PI / 2]} scale={0.512}>
                <mesh name="Object_251" geometry={nodes.Object_251.geometry} material={materials.material_1} />
              </group>
              <group name="Cube103_132" position={[0, 0.512, 0.384]} rotation={[0, 0, Math.PI / 2]} scale={0.512}>
                <mesh name="Object_253" geometry={nodes.Object_253.geometry} material={materials.material_1} />
              </group>
              <group name="Cube104_133" position={[0, 0.512, 0.333]} rotation={[0, 0, Math.PI / 2]} scale={0.512}>
                <mesh name="Object_255" geometry={nodes.Object_255.geometry} material={materials.material_1} />
              </group>
              <group name="Cube105_134" position={[0, 0.512, 0.282]} rotation={[0, 0, Math.PI / 2]} scale={0.512}>
                <mesh name="Object_257" geometry={nodes.Object_257.geometry} material={materials.material_1} />
              </group>
              <group name="Cube106_135" position={[0, 0.512, 0.23]} rotation={[0, 0, Math.PI / 2]} scale={0.512}>
                <mesh name="Object_259" geometry={nodes.Object_259.geometry} material={materials.material_1} />
              </group>
              <group name="Cube107_136" position={[0, 0.512, 0.179]} rotation={[0, 0, Math.PI / 2]} scale={0.512}>
                <mesh name="Object_261" geometry={nodes.Object_261.geometry} material={materials.material_1} />
              </group>
              <group name="Cube108_137" position={[0, 0.512, 0.128]} rotation={[0, 0, Math.PI / 2]} scale={0.512}>
                <mesh name="Object_263" geometry={nodes.Object_263.geometry} material={materials.material_1} />
              </group>
              <group name="Cube109_138" position={[0, 0.512, 0.077]} rotation={[0, 0, Math.PI / 2]} scale={0.512}>
                <mesh name="Object_265" geometry={nodes.Object_265.geometry} material={materials.material_1} />
              </group>
              <group name="Cube110_139" position={[0, 0.512, 0.026]} rotation={[0, 0, Math.PI / 2]} scale={0.512}>
                <mesh name="Object_267" geometry={nodes.Object_267.geometry} material={materials.material_1} />
              </group>
              <group name="Cube111_140" position={[0, 0.512, -0.026]} rotation={[0, 0, Math.PI / 2]} scale={0.512}>
                <mesh name="Object_269" geometry={nodes.Object_269.geometry} material={materials.material_1} />
              </group>
              <group name="Cube112_141" position={[0, 0.512, -0.077]} rotation={[0, 0, Math.PI / 2]} scale={0.512}>
                <mesh name="Object_271" geometry={nodes.Object_271.geometry} material={materials.material_1} />
              </group>
              <group name="Cube113_142" position={[0, 0.512, -0.128]} rotation={[0, 0, Math.PI / 2]} scale={0.512}>
                <mesh name="Object_273" geometry={nodes.Object_273.geometry} material={materials.material_1} />
              </group>
              <group name="Cube114_143" position={[0, 0.512, -0.179]} rotation={[0, 0, Math.PI / 2]} scale={0.512}>
                <mesh name="Object_275" geometry={nodes.Object_275.geometry} material={materials.material_1} />
              </group>
              <group name="Cube115_144" position={[0, 0.512, -0.23]} rotation={[0, 0, Math.PI / 2]} scale={0.512}>
                <mesh name="Object_277" geometry={nodes.Object_277.geometry} material={materials.material_1} />
              </group>
              <group name="Cube116_145" position={[0, 0.512, -0.282]} rotation={[0, 0, Math.PI / 2]} scale={0.512}>
                <mesh name="Object_279" geometry={nodes.Object_279.geometry} material={materials.material_1} />
              </group>
              <group name="Cube117_146" position={[0, 0.512, -0.333]} rotation={[0, 0, Math.PI / 2]} scale={0.512}>
                <mesh name="Object_281" geometry={nodes.Object_281.geometry} material={materials.material_1} />
              </group>
              <group name="Cube118_147" position={[0, 0.512, -0.384]} rotation={[0, 0, Math.PI / 2]} scale={0.512}>
                <mesh name="Object_283" geometry={nodes.Object_283.geometry} material={materials.material_1} />
              </group>
              <group name="Cube119_148" position={[0, 0.512, -0.435]} rotation={[0, 0, Math.PI / 2]} scale={0.512}>
                <mesh name="Object_285" geometry={nodes.Object_285.geometry} material={materials.material_1} />
              </group>
              <group name="Cube120_149" position={[0, 0.512, -0.486]} rotation={[0, 0, Math.PI / 2]} scale={0.512}>
                <mesh name="Object_287" geometry={nodes.Object_287.geometry} material={materials.material_1} />
              </group>
              <group name="Cube141_150" position={[0, -0.512, -0.486]} rotation={[0, 0, Math.PI / 2]} scale={0.512}>
                <mesh name="Object_289" geometry={nodes.Object_289.geometry} material={materials.material_2} />
              </group>
              <group name="Cube142_151" position={[0, -0.512, -0.435]} rotation={[0, 0, Math.PI / 2]} scale={0.512}>
                <mesh name="Object_291" geometry={nodes.Object_291.geometry} material={materials.material_2} />
              </group>
              <group name="Cube143_152" position={[0, -0.512, -0.384]} rotation={[0, 0, Math.PI / 2]} scale={0.512}>
                <mesh name="Object_293" geometry={nodes.Object_293.geometry} material={materials.material_2} />
              </group>
              <group name="Cube144_153" position={[0, -0.512, -0.333]} rotation={[0, 0, Math.PI / 2]} scale={0.512}>
                <mesh name="Object_295" geometry={nodes.Object_295.geometry} material={materials.material_2} />
              </group>
              <group name="Cube145_154" position={[0, -0.512, -0.282]} rotation={[0, 0, Math.PI / 2]} scale={0.512}>
                <mesh name="Object_297" geometry={nodes.Object_297.geometry} material={materials.material_2} />
              </group>
              <group name="Cube146_155" position={[0, -0.512, -0.23]} rotation={[0, 0, Math.PI / 2]} scale={0.512}>
                <mesh name="Object_299" geometry={nodes.Object_299.geometry} material={materials.material_2} />
              </group>
              <group name="Cube147_156" position={[0, -0.512, -0.179]} rotation={[0, 0, Math.PI / 2]} scale={0.512}>
                <mesh name="Object_301" geometry={nodes.Object_301.geometry} material={materials.material_2} />
              </group>
              <group name="Cube148_157" position={[0, -0.512, -0.128]} rotation={[0, 0, Math.PI / 2]} scale={0.512}>
                <mesh name="Object_303" geometry={nodes.Object_303.geometry} material={materials.material_2} />
              </group>
              <group name="Cube149_158" position={[0, -0.512, -0.077]} rotation={[0, 0, Math.PI / 2]} scale={0.512}>
                <mesh name="Object_305" geometry={nodes.Object_305.geometry} material={materials.material_2} />
              </group>
              <group name="Cube150_159" position={[0, -0.512, -0.026]} rotation={[0, 0, Math.PI / 2]} scale={0.512}>
                <mesh name="Object_307" geometry={nodes.Object_307.geometry} material={materials.material_2} />
              </group>
              <group name="Cube151_160" position={[0, -0.512, 0.026]} rotation={[0, 0, Math.PI / 2]} scale={0.512}>
                <mesh name="Object_309" geometry={nodes.Object_309.geometry} material={materials.material_2} />
              </group>
              <group name="Cube152_161" position={[0, -0.512, 0.077]} rotation={[0, 0, Math.PI / 2]} scale={0.512}>
                <mesh name="Object_311" geometry={nodes.Object_311.geometry} material={materials.material_2} />
              </group>
              <group name="Cube153_162" position={[0, -0.512, 0.128]} rotation={[0, 0, Math.PI / 2]} scale={0.512}>
                <mesh name="Object_313" geometry={nodes.Object_313.geometry} material={materials.material_2} />
              </group>
              <group name="Cube154_163" position={[0, -0.512, 0.179]} rotation={[0, 0, Math.PI / 2]} scale={0.512}>
                <mesh name="Object_315" geometry={nodes.Object_315.geometry} material={materials.material_2} />
              </group>
              <group name="Cube155_164" position={[0, -0.512, 0.23]} rotation={[0, 0, Math.PI / 2]} scale={0.512}>
                <mesh name="Object_317" geometry={nodes.Object_317.geometry} material={materials.material_2} />
              </group>
              <group name="Cube156_165" position={[0, -0.512, 0.282]} rotation={[0, 0, Math.PI / 2]} scale={0.512}>
                <mesh name="Object_319" geometry={nodes.Object_319.geometry} material={materials.material_2} />
              </group>
              <group name="Cube157_166" position={[0, -0.512, 0.333]} rotation={[0, 0, Math.PI / 2]} scale={0.512}>
                <mesh name="Object_321" geometry={nodes.Object_321.geometry} material={materials.material_2} />
              </group>
              <group name="Cube158_167" position={[0, -0.512, 0.384]} rotation={[0, 0, Math.PI / 2]} scale={0.512}>
                <mesh name="Object_323" geometry={nodes.Object_323.geometry} material={materials.material_2} />
              </group>
              <group name="Cube159_168" position={[0, -0.512, 0.435]} rotation={[0, 0, Math.PI / 2]} scale={0.512}>
                <mesh name="Object_325" geometry={nodes.Object_325.geometry} material={materials.material_2} />
              </group>
              <group name="Cube160_169" position={[0, -0.512, 0.486]} rotation={[0, 0, Math.PI / 2]} scale={0.512}>
                <mesh name="Object_327" geometry={nodes.Object_327.geometry} material={materials.material_2} />
              </group>
              <group name="Circle010_170" rotation={[0, 0, -Math.PI]} scale={0.512} />
              <group name="Cube_0" scale={1.034}>
                <mesh name="Object_4" geometry={nodes.Object_4.geometry} material={materials.material} />
              </group>
              <group name="Circle002_41" rotation={[0, 0, -Math.PI]} />
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('models/magic_cube_ii.glb')
