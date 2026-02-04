import { supabase } from '@/lib/superbase'
import Link from 'next/link'

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

      <div className="flex flex-col gap-4 mt-8 w-full max-w-md">
        <Link href="/important-dates">
          <div className="w-full px-6 py-4 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition text-center">
            Datele importante
          </div>
        </Link>

        <Link href="/daily-love">
          <div className="w-full px-6 py-4 bg-pink-400 text-white rounded-lg hover:bg-pink-500 transition text-center">
            Iubirea ta zilnica
          </div>
        </Link>

        <Link href="/gallery">
          <div className="w-full px-6 py-4 bg-pink-300 text-white rounded-lg hover:bg-pink-400 transition text-center">
            Galerie de poze
          </div>
        </Link>
      </div>
    </main>
  )
}