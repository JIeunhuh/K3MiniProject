import chardet

def guess_encoding(file_path):
    with open(file_path, 'rb') as f:
        raw_data = f.read()
        result = chardet.detect(raw_data)
        return result['encoding']

csv_file_path = "경로/파일명.csv"
encoding = guess_encoding(csv_file_path)
print("CSV 파일의 인코딩:", encoding)
