## Pseudocode Program Pencarian Data

### Prosedur LoadCSV
INPUT: path_file  
OUTPUT: array_data  

BEGIN
    Baca seluruh isi file CSV
    Pisahkan baris berdasarkan baris baru
    Hapus baris header
    FOR setiap baris
        Ambil kolom pertama
        Ubah ke huruf kecil
        Simpan ke array_data
    END FOR
    RETURN array_data
END


### Prosedur SentinelLinearSearch
INPUT: array_data, target  
OUTPUT: status_ditemukan, indeks, langkah, waktu  

BEGIN
    Ubah target ke huruf kecil
    Simpan elemen terakhir array
    Pasang target sebagai sentinel di elemen terakhir
    i ← 0
    langkah ← 0
    Catat waktu mulai

    WHILE array_data[i] ≠ target
        i ← i + 1
        langkah ← langkah + 1
    END WHILE

    Kembalikan elemen terakhir ke nilai semula

    IF i < panjang_array − 1 OR elemen_terakhir = target THEN
        status_ditemukan ← TRUE
        indeks ← i
    ELSE
        status_ditemukan ← FALSE
        indeks ← −1
    END IF

    Hitung waktu eksekusi
    RETURN status_ditemukan, indeks, langkah, waktu
END


### Prosedur IndexSequentialSearch
INPUT: array_data, target, ukuran_blok  
OUTPUT: status_ditemukan, indeks, langkah, waktu  

BEGIN
    Ubah target ke huruf kecil
    langkah ← 0
    Catat waktu mulai

    FOR i ← 0 TO panjang_array STEP ukuran_blok
        Tambahkan (array_data[i], i) ke tabel_indeks
    END FOR

    blok ← −1
    FOR setiap entri dalam tabel_indeks
        langkah ← langkah + 1
        IF nilai_indeks = target THEN
            blok ← indeks_blok
            BREAK
        ELSE IF nilai_indeks > target THEN
            blok ← indeks_blok − 1
            BREAK
        END IF
    END FOR

    IF blok < 0 THEN
        RETURN tidak_ditemukan
    END IF

    Tentukan batas_awal dan batas_akhir blok

    FOR i ← batas_awal TO batas_akhir
        langkah ← langkah + 1
        IF array_data[i] = target THEN
            Hitung waktu eksekusi
            RETURN ditemukan, i, langkah, waktu
        END IF
    END FOR

    Hitung waktu eksekusi
    RETURN tidak_ditemukan
END


### Program Utama
BEGIN
    data ← LoadCSV(file_CSV)
    Urutkan data secara alfabetis

    Input daftar_target dari pengguna
    FOR setiap target dalam daftar_target
        Jalankan SentinelLinearSearch
        Jalankan IndexSequentialSearch
        Simpan hasil ke tabel_output
    END FOR

    Tampilkan tabel_output
END
