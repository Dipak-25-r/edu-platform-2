'use client'
import { useState } from 'react'
import Card from '@/components/Card'
import { MagnifyingGlassIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'

export default function NotesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [selectedClass, setSelectedClass] = useState('all')

  const notes = {
    physics: {
      class11: [
        { id: 1, chapter: 'Physical World', topics: 'Physics, natural phenomena, fundamental forces' },
        { id: 2, chapter: 'Units and Measurements', topics: 'SI units, dimensional analysis, errors' },
        { id: 3, chapter: 'Motion in a Straight Line', topics: 'Kinematics, velocity, acceleration' },
        { id: 4, chapter: 'Motion in a Plane', topics: 'Vectors, projectile motion' },
        { id: 5, chapter: 'Laws of Motion', topics: 'Newton\'s laws, friction, circular motion' },
        { id: 6, chapter: 'Work, Energy and Power', topics: 'Work-energy theorem, conservation' },
        { id: 7, chapter: 'Gravitation', topics: 'Universal gravitation, Kepler\'s laws, satellites' },
        { id: 8, chapter: 'Thermodynamics', topics: 'Laws of thermodynamics, heat engines' },
        { id: 9, chapter: 'Oscillations', topics: 'SHM, pendulum, resonance' },
        { id: 10, chapter: 'Waves', topics: 'Wave motion, sound, Doppler effect' }
      ],
      class12: [
        { id: 11, chapter: 'Electrostatics', topics: 'Coulomb\'s law, electric field, Gauss law' },
        { id: 12, chapter: 'Current Electricity', topics: 'Ohm\'s law, circuits, Kirchhoff\'s laws' },
        { id: 13, chapter: 'Magnetic Effects of Current', topics: 'Biot-Savart, Ampere\'s law' },
        { id: 14, chapter: 'Electromagnetic Induction', topics: 'Faraday\'s law, Lenz\'s law, AC' },
        { id: 15, chapter: 'Ray Optics', topics: 'Reflection, refraction, lenses, mirrors' },
        { id: 16, chapter: 'Wave Optics', topics: 'Interference, diffraction, polarization' },
        { id: 17, chapter: 'Dual Nature of Radiation', topics: 'Photoelectric effect, matter waves' },
        { id: 18, chapter: 'Atoms and Nuclei', topics: 'Bohr model, radioactivity, nuclear reactions' },
        { id: 19, chapter: 'Semiconductor Electronics', topics: 'Diodes, transistors, logic gates' }
      ]
    },
    chemistry: {
      class11: [
        { id: 20, chapter: 'Basic Concepts of Chemistry', topics: 'Atoms, molecules, stoichiometry' },
        { id: 21, chapter: 'Structure of Atom', topics: 'Quantum mechanics, atomic orbitals' },
        { id: 22, chapter: 'Chemical Bonding', topics: 'Ionic, covalent, metallic bonds, VSEPR' },
        { id: 23, chapter: 'States of Matter', topics: 'Gas laws, kinetic theory, liquids' },
        { id: 24, chapter: 'Thermodynamics', topics: 'Enthalpy, entropy, Gibbs energy' },
        { id: 25, chapter: 'Equilibrium', topics: 'Chemical equilibrium, Le Chatelier\'s principle' },
        { id: 26, chapter: 'Redox Reactions', topics: 'Oxidation states, balancing equations' },
        { id: 27, chapter: 'Organic Chemistry Basics', topics: 'Nomenclature, isomerism, reactions' },
        { id: 28, chapter: 'Hydrocarbons', topics: 'Alkanes, alkenes, alkynes, aromatics' }
      ],
      class12: [
        { id: 29, chapter: 'Solutions', topics: 'Concentration, colligative properties, Raoult\'s law' },
        { id: 30, chapter: 'Electrochemistry', topics: 'Galvanic cells, Nernst equation, electrolysis' },
        { id: 31, chapter: 'Chemical Kinetics', topics: 'Rate laws, order, Arrhenius equation' },
        { id: 32, chapter: 'Surface Chemistry', topics: 'Adsorption, colloids, catalysis' },
        { id: 33, chapter: 'd and f Block Elements', topics: 'Transition metals, coordination compounds' },
        { id: 34, chapter: 'Alcohols, Phenols and Ethers', topics: 'Properties, reactions, uses' },
        { id: 35, chapter: 'Aldehydes and Ketones', topics: 'Carbonyl compounds, nucleophilic addition' },
        { id: 36, chapter: 'Amines', topics: 'Preparation, properties, reactions' },
        { id: 37, chapter: 'Biomolecules', topics: 'Carbohydrates, proteins, nucleic acids' },
        { id: 38, chapter: 'Polymers', topics: 'Types, properties, applications' }
      ]
    },
    mathematics: {
      class11: [
        { id: 39, chapter: 'Sets and Functions', topics: 'Set theory, relations, functions' },
        { id: 40, chapter: 'Trigonometry', topics: 'Ratios, identities, equations' },
        { id: 41, chapter: 'Complex Numbers', topics: 'Algebra, Argand plane, De Moivre\'s theorem' },
        { id: 42, chapter: 'Permutations & Combinations', topics: 'Counting principles, arrangements' },
        { id: 43, chapter: 'Binomial Theorem', topics: 'Expansion, general term' },
        { id: 44, chapter: 'Sequences and Series', topics: 'AP, GP, special series' },
        { id: 45, chapter: 'Straight Lines', topics: 'Slope, equations, distance' },
        { id: 46, chapter: 'Conic Sections', topics: 'Circle, parabola, ellipse, hyperbola' },
        { id: 47, chapter: 'Limits and Derivatives', topics: 'Limits, differentiation rules' },
        { id: 48, chapter: 'Statistics', topics: 'Mean, median, variance, std dev' }
      ],
      class12: [
        { id: 49, chapter: 'Relations and Functions', topics: 'Types of functions, inverse functions' },
        { id: 50, chapter: 'Inverse Trigonometry', topics: 'Inverse trig functions, properties' },
        { id: 51, chapter: 'Matrices', topics: 'Operations, transpose, symmetric matrices' },
        { id: 52, chapter: 'Determinants', topics: 'Properties, cofactors, applications' },
        { id: 53, chapter: 'Continuity and Differentiability', topics: 'Continuity, differentiation techniques' },
        { id: 54, chapter: 'Applications of Derivatives', topics: 'Rate of change, maxima/minima' },
        { id: 55, chapter: 'Integrals', topics: 'Integration techniques, definite integrals' },
        { id: 56, chapter: 'Differential Equations', topics: 'First order, linear DE, applications' },
        { id: 57, chapter: 'Vectors', topics: 'Vector algebra, dot and cross products' },
        { id: 58, chapter: 'Three Dimensional Geometry', topics: 'Direction cosines, lines, planes' },
        { id: 59, chapter: 'Probability', topics: 'Conditional probability, Bayes theorem' }
      ]
    }
  }

  const getAllNotes = () => {
    let allNotes = []
    Object.keys(notes).forEach(subject => {
      Object.keys(notes[subject]).forEach(cls => {
        notes[subject][cls].forEach(note => {
          allNotes.push({
            ...note,
            subject: subject.charAt(0).toUpperCase() + subject.slice(1),
            class: cls === 'class11' ? 'Class 11' : 'Class 12'
          })
        })
      })
    })
    return allNotes
  }

  const filteredNotes = getAllNotes().filter(note => {
    const matchesSearch = note.chapter.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.topics.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = selectedSubject === 'all' || note.subject.toLowerCase() === selectedSubject
    const matchesClass = selectedClass === 'all' || note.class.toLowerCase().replace(' ', '') === selectedClass
    return matchesSearch && matchesSubject && matchesClass
  })

  return (
    <div className="py-12">
      <div className="container-custom">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-center">
          Complete Study Materials
        </h1>
        <p className="text-lg text-dark/70 text-center mb-12 max-w-2xl mx-auto">
          Comprehensive notes for Class 11 & 12 Physics, Chemistry, and Mathematics
        </p>

        {/* Filters */}
        <Card className="mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="w-5 h-5 text-dark/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search chapters or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Subject Filter */}
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-3 border border-gray-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Subjects</option>
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
              <option value="mathematics">Mathematics</option>
            </select>

            {/* Class Filter */}
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-4 py-3 border border-gray-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Classes</option>
              <option value="class11">Class 11</option>
              <option value="class12">Class 12</option>
            </select>
          </div>
        </Card>

        {/* Results */}
        <div className="mb-6 text-dark/60">
          Showing {filteredNotes.length} chapter{filteredNotes.length !== 1 ? 's' : ''}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map(note => (
            <Card key={note.id} className="cursor-pointer group">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                    {note.subject}
                  </span>
                  <span className="text-xs font-semibold text-dark/60 bg-gray px-2 py-1 rounded ml-2">
                    {note.class}
                  </span>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {note.chapter}
              </h3>
              
              <p className="text-sm text-dark/70 mb-4">
                {note.topics}
              </p>
              
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm">
                  <span>View Notes</span>
                </button>
                <button className="p-2 border border-gray-medium rounded-lg hover:bg-gray transition-colors">
                  <ArrowDownTrayIcon className="w-5 h-5 text-dark/70" />
                </button>
              </div>
            </Card>
          ))}
        </div>

        {filteredNotes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-dark/50 text-lg">No chapters found matching your search</p>
          </div>
        )}
      </div>
    </div>
  )
}
