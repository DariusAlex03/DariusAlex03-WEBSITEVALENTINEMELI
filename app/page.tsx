import { supabase } from '@/lib/superbase' 

type ImportantDate = {
  id: number        
  type: string
  date: string      
  clasa: string
}

export default async function TempsPage() {
  const { data, error } = await supabase
    .from('important_dates')
    .select<'*', ImportantDate>()
    .order('date', { ascending: true })

  if (error) {
    return (
      <main className="p-6 text-red-500">
        Erreur : {error.message}
      </main>
    )
  }

  return (
    <main 
      className="p-6 min-h-screen bg-cover bg-center bg-fixed flex flex-col items-center justify-center"
      style={{
        backgroundImage: 'url(/background.svg)',
      }}
    >
      <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-transparent rounded-lg shadow-lg flex items-center justify-center">
        <img src="/happyVD.svg" alt="logo" className="w-full h-full object-cover rounded-lg" />
      </div>

      <div className="flex flex-col gap-4 mt-8">
        <button className="px-25 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Datele importante
        </button>
        <button className="px-25 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
          Iubirea ta zilnica
        </button>
        <button className="px-25 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
          Galerie de poze
        </button>
      </div>
    </main>
  )
}