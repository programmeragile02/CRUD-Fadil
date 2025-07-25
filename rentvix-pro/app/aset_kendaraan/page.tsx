'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Aset_kendaraanPage() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({});
  const [editId, setEditId] = useState(null);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const res = await axios.get('http://localhost:8000/api/aset_kendaraan');
    setData(res.data);
  };

  const saveData = async () => {
    if (editId) {
      await axios.put('http://localhost:8000/api/aset_kendaraan/' + editId, form);
    } else {
      await axios.post('http://localhost:8000/api/aset_kendaraan', form);
    }
    setForm({}); setEditId(null); fetchData();
  };

  const deleteData = async (id) => {
    await axios.delete('http://localhost:8000/api/aset_kendaraan/' + id);
    fetchData();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Data Aset_kendaraan</h1>
      <input
        type="text"
        name="merk"
        value={form.merk || ''}
        onChange={(e) => setForm({ ...form, merk: e.target.value })}
        placeholder="merk"
        className="border p-2 mb-2 w-full"
      />
      <input
        type="text"
        name="tahun_pembuatan"
        value={form.tahun_pembuatan || ''}
        onChange={(e) => setForm({ ...form, tahun_pembuatan: e.target.value })}
        placeholder="tahun_pembuatan"
        className="border p-2 mb-2 w-full"
      />
      <input
        type="text"
        name="stnk"
        value={form.stnk || ''}
        onChange={(e) => setForm({ ...form, stnk: e.target.value })}
        placeholder="stnk"
        className="border p-2 mb-2 w-full"
      />
      <button onClick={saveData} className="bg-blue-500 text-white px-4 py-2 rounded">Simpan</button>

      <table className="w-full mt-4 border">
        <thead><tr><th className='border p-2'>merk</th><th className='border p-2'>tahun_pembuatan</th><th className='border p-2'>stnk</th><th className='border p-2'>Aksi</th></tr></thead><tbody>{data.map((item) => (<tr key={item.id}><td className='border p-2'>{item.merk}</td><td className='border p-2'>{item.tahun_pembuatan}</td><td className='border p-2'>{item.stnk}</td>            <td className="border p-2">
              <button onClick={() => { setForm(item); setEditId(item.id); }} className="text-blue-500">Edit</button>
              <button onClick={() => deleteData(item.id)} className="text-red-500 ml-2">Hapus</button>
            </td>
          </tr>))}</tbody>
      </table>
    </div>
  );
}