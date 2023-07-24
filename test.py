import pandas as pd

input_csv_file = './dataset.csv'
output_csv_file = 'output.csv'

# CSV 파일을 DataFrame으로 읽어옵니다.
df = pd.read_csv(input_csv_file, encoding='cp949')
filtered_df = df[df['데이터갱신구분'] != "I"]

# 새로운 CSV 파일로 저장합니다.
filtered_df.to_csv(output_csv_file, index=False, encoding='cp949')

